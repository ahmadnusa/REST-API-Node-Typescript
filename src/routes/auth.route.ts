import { Router } from 'express'
import { registerUser } from '../controllers/auth.controller'

export const authRouter: Router = Router()

authRouter.post('/register', registerUser)
