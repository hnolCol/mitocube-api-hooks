
/**
 * @typedef WellPosition
 * @type {Object}
 * @property {Number} row - The row index
 * @property {Number} column - The column index.
 */


/**
 * @typedef Runlist 
 * @type {Object}
 * @property {Run[]} runs - List of runs 
 * @property {String} submission_label - The label for which the runlist has been created.   
 * @property {Number} n_plates - The number of plates. 
 * @property {Number} n_fractions - The number of fractions. 
 * @property {Number} n_runs - The total number of runs.
 * @property {Boolean} fractionate - If fracationation has been enabled. 
 * @property {String} aggregate_on - If samples are pooled, the name of the samples attributes that was used to aggregate the samples. 
 * @property {Number} created_on - The unix time stamp. 
 * @property {String} user_label - The database user label 
 * @property {String} user_firstname - The users first name that created the runlist
 * @property {String} user_email - The email of the user that created the runlist 
 * @property {String} user_lastname - The user's last name 
 */

/**
* @typedef Run 
* @type {Object}
* @property {String} name - The name of the run (e.g. the raw files name.)
* @property {Number} column_index - The column index starting at index 0 
* @property {Number} row_index - The row index starting at index 0
* @property {String} position_label - The position label (e.g. A1, D12)
* @property {String} label - Pseudo random label of a run  
* @property {Number} index
* @property {Number} measurement_index
* @property {Number[]} aggregated_samples 
* @property {Number} measured_at
* @property {Number} plate_index
*/


export default {}