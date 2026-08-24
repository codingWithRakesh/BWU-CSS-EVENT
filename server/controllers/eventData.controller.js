import eventData from '../models/EventData.js';

export const getLeaderboard = async (req, res) => {
    try {
        const { semester } = req.query;
        const filter = { applicationStatus: 'accepted' };

        if (semester) {
            const normalizedSemester = String(semester).trim();

            const escapedSemester = normalizedSemester.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            filter.eventName = {
                $regex: `\\(${escapedSemester}\\s+Semester\\)`,
                $options: 'i'
            };
        }

        const participants = await eventData
            .find(filter)
            .select('eventName studentName studentCode studentSecation studentProfileimage userScore createdAt')
            .sort({ userScore: -1, createdAt: 1 })
            .lean();

        res.status(200).json({
            success: true,
            data: participants
        });
    } catch (error) {
        console.error('Failed to get leaderboard:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to load leaderboard data.'
        });
    }
};

// Find the most recently accepted event participant for the email entered in Score Manager.
export const getParticipantByEmail = async (req, res) => {
    try {
        const email = String(req.query.email || '').trim();

        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required.' });
        }

        const escapedEmail = email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const participant = await eventData
            .findOne({
                studentGmail: { $regex: `^${escapedEmail}$`, $options: 'i' },
                applicationStatus: 'accepted'
            })
            .select('eventName studentName studentGmail studentCode studentSecation studentProfileimage userScore')
            .sort({ createdAt: -1 })
            .lean();

        if (!participant) {
            return res.status(404).json({ success: false, message: 'No accepted participant was found for this email.' });
        }

        return res.status(200).json({ success: true, data: participant });
    } catch (error) {
        console.error('Failed to find participant:', error);
        return res.status(500).json({ success: false, message: 'Unable to find participant data.' });
    }
};

export const updateParticipantScore = async (req, res) => {
    try {
        const { score } = req.body;
        const numericScore = Number(score);

        if (score === '' || score === null || score === undefined || !Number.isFinite(numericScore) || numericScore < 0) {
            return res.status(400).json({ success: false, message: 'Score must be a valid non-negative number.' });
        }

        const participant = await eventData.findOneAndUpdate(
            { _id: req.params.id, applicationStatus: 'accepted' },
            { $set: { userScore: numericScore } },
            { new: true, runValidators: true }
        ).select('eventName studentName studentGmail studentCode studentSecation studentProfileimage userScore').lean();

        if (!participant) {
            return res.status(404).json({ success: false, message: 'Accepted participant not found.' });
        }

        return res.status(200).json({
            success: true,
            message: 'Marks updated successfully.',
            data: participant
        });
    } catch (error) {
        console.error('Failed to update score:', error);
        return res.status(500).json({ success: false, message: 'Unable to update marks.' });
    }
};
