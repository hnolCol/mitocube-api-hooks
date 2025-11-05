


/**
 * @typedef Submission
 * @type {Object}
 * @property {String} tag - The submission tag name.
 * @property {String} title - The submission's title 
 * @property {Number} n_replicates- The number of replicates 
 * @property {Number} n_samples - The number of samples 
 * @property {Boolean} has_datatable - If the submission has a datatable (e.g. quantitative matrix)
 * @property {Number} state - The state the submission is in.
 * @summary Sample set for a given submission.
*/


/**
 * @typedef SubmissionSamples
 * @type {Object}
 * @property {String} name - The sample name.
 * @property {Number} replicate - The sample replicate
 * @property {Number} index - The sample index. The index corresponds to the column index of the datatable. 
 * @summary Sample set for a given submission.
*/




export default {}