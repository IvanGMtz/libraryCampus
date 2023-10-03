import { con } from "../../../services/connection/atlas.js";
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../../helpers/jwt.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

let db = await con();
let collection = db.collection("user");

export const register = async (req, res) => {
    try {
        await Promise.all([
            body('name').notEmpty().run(req),
            body('last_name').notEmpty().run(req),
            body('password').notEmpty().run(req),
            body('email').isEmail().run(req)
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userFound = await collection.findOne({ email: req.body.email });

        if (userFound)
            return res.status(400).json({
                message: ["The email is already in use"],
            });
        
        const password = await bcrypt.hash(req.body.password, 10)

        let newUser = {
            name: req.body.name,
            last_name: req.body.last_name,
            password: password,
            email: req.body.email,
            role: 'customer'
        };

        const result = await collection.insertOne(newUser);

        newUser.id = result.insertedId;
        newUser.createdAt = new Date();

        const token = await createAccessToken({id: newUser.id})
        res.cookie("token", token);

        res.status(201).json({
            message: "User added successfully", UserInfo: [{
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                createdAt: newUser.createdAt
        }]  });
    } catch (error) {
        res.status(500).json({ message: "Error adding user", error: error.message });
    }
} 

export const registerEmployee = async (req, res) => {
    try {
        await Promise.all([
            body('name').notEmpty().run(req),
            body('last_name').notEmpty().run(req),
            body('password').notEmpty().run(req),
            body('email').isEmail().run(req)
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userFound = await collection.findOne({ email: req.body.email });

        if (userFound)
            return res.status(400).json({
                message: ["The email is already in use"],
            });
        
        const password = await bcrypt.hash(req.body.password, 10)

        let newEmployee = {
            name: req.body.name,
            last_name: req.body.last_name,
            password: password,
            email: req.body.email,
            role: 'employee'
        };

        const result = await collection.insertOne(newEmployee);

        newEmployee.id = result.insertedId;
        newEmployee.createdAt = new Date();

        const token = await createAccessToken({id: newEmployee.id})
        res.cookie("token", token);

        res.status(201).json({
            message: "Employee added successfully", EmployeeInfo: [{
                id: newEmployee.id,
                name: newEmployee.name,
                email: newEmployee.email,
                createdAt: newEmployee.createdAt
        }]  });
    } catch (error) {
        res.status(500).json({ message: "Error adding employee", error: error.message });
    }
}

export const login = async (req, res)=>{
    try {
        await Promise.all([
            body('password').notEmpty().run(req),
            body('email').isEmail().run(req)
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userFound = await collection.findOne({ email: req.body.email });
        if (!userFound)
            return res.status(400).json({
                message: ["The email does not exist"],
            });
        
        const isMatch = await bcrypt.compare(req.body.password , userFound.password);
        if (!isMatch) {
            return res.status(400).json({
                message: ["The password is incorrect"],
            });
        }

        const token = await createAccessToken({
            id: userFound._id,
            username: userFound.username,
        });

        res.cookie("token", token);

        res.json({
            id: userFound._id,
            username: userFound.name,
            email: userFound.email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} 

export const logout = async (req, res)=> {
    res.cookie('token', '', {
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const profile = async (req, res)=> {
    const user = await collection.findOne({_id: new ObjectId(req.user.id)});
    return res.json(user);
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);
  
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.sendStatus(401);
  
      const userFound = await collection.findOne({ _id: new ObjectId(user.id) });
      if (!userFound) return res.sendStatus(401);
  
      return res.json({
        id: userFound._id,
        username: userFound.name,
        email: userFound.email,
      });
    });
  };