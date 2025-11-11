import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    city: {
      type: String,
      trim: true,
    },
    postalOffice: {
      type: Number,
      default: 1,
    },
    avatar: {
      type: String,
    },
    avatar_id: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: 'user',
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
