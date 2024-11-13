import RecomendationsService from "../services/recomendations.service.js";

const RecomendationComparation = async (req, res) => {
    const userId = req.id;
    
    if (!userId) {
        return res.status(400).json({ message: "Se requiere userId" });
    }

    try {
        const Recomendations = await RecomendationsService.MakeRecomendationsComparations(userId);
        res.status(200).json({ Recomendations });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const RecomendationTendency = async (req, res) => {
    const userId = req.id;
    
    if (!userId) {
        return res.status(400).json({ message: "Se requiere userId" });
    }

    try {
        const Recomendations = await RecomendationsService.MakeRecomendationsTendency(userId);
        res.status(200).json({ Recomendations });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    RecomendationComparation, 
    RecomendationTendency 
};
