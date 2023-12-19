import { Router } from 'express'
import { createSession, registerUser } from '../controllers/auth.controller'

export const authRouter: Router = Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', createSession)
