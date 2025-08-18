const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
	fullName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	gender: {
		type: DataTypes.ENUM('male', 'female', 'other'),
		allowNull: false,
	},
	lookingFor: {
		type: DataTypes.ENUM('dating', 'marriage'),
		allowNull: false,
		defaultValue: 'dating',
	},
	caste: {
		type: DataTypes.STRING,
	},
	religion: {
		type: DataTypes.STRING,
	},
	occupation: {
		type: DataTypes.STRING,
	},
	dateOfBirth: {
		type: DataTypes.DATEONLY,
	},
	description: {
		type: DataTypes.TEXT,
	},
	education: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: { isEmail: true },
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	interests: {
		type: DataTypes.STRING, // Changed from ARRAY to STRING for SQLite compatibility
		get() {
			const rawValue = this.getDataValue('interests');
			return rawValue ? JSON.parse(rawValue) : [];
		},
		set(value) {
			this.setDataValue('interests', JSON.stringify(value));
		}
	},
	callerId: {
		type: DataTypes.STRING,
		unique: true,
	},
	isOnline: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	matchesCount: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
}, {
	hooks: {
		beforeCreate: async (user) => {
			user.password = await bcrypt.hash(user.password, 10);
			if (!user.callerId) {
				user.callerId = `CALL-${Math.floor(100000 + Math.random() * 900000)}`;
			}
		},
	},
});

module.exports = User;
