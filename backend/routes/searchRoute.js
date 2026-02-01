import { addMovie, getRecentSearches } from "../controllers/searchController.js";
import authorizeMiddleware from "../middleware/authMiddleware.js";
import { Router } from "express";

const router = Router()

router.post('/add',authorizeMiddleware,addMovie)
router.get('/recent', authorizeMiddleware, getRecentSearches)


export default router