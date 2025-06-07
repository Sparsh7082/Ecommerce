const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const User = require('../model/user.model')
const catchAsyncError = require('../middleware/catchAsyncError')

