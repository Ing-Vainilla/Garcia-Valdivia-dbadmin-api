"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUser = void 0;
const getUser = (req, res) => {
    const user = {
        name: "John",
        lastname: "Doe",
        email: "johndoe@example.com",
        age: 30,
        active: true,
        subjects: [
            "Math",
            "Science",
            "History"
        ],
        address: {
            street: "123 Main St",
            city: "Anytown",
        },
        arregloDeObjetos: [
            {
                name: "John",
                lastname: "Doe",
            },
            {
                name: "Jane",
                lastname: "Smith",
            },
            {
                name: "Alice",
                lastname: "Johnson",
            }
        ],
    };
    res.json({
        "status": "success",
        "data": user
    });
};
exports.getUser = getUser;
const getUserById = (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "id": req.params.id,
            "name": "John",
        }
    });
};
exports.getUserById = getUserById;
