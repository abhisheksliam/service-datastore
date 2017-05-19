import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Script Schema
 */
const ScriptSchema = new mongoose.Schema({
  "uuid": String,
  "name": String,
  "sle_id": String,
  "meta": {},
  "publish": {},
  "task_json": []
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
ScriptSchema.method({
});

/**
 * Statics
 */
ScriptSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of script.
   * @returns {Promise<User, APIError>}
   */
  get(_q) {
    return this.findOne(_q)
      .exec()
      .then((script) => {
        return script;

        const err = new APIError('No such script exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List script in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Script
 */
export default mongoose.model('Script', ScriptSchema, 'scripts');
