/**
 * @typedef Attribute
 * @type {Object}
 * @property {number} id - The id of the attribute
 * @property {number} parent_id - The id of the attribute that is the parent of the attribute.
 * @property {string} parent_tag
 * @property {Number}  priority - Number defining the priority, defaults to ``500``
 * @property {string} tag - The tag of the attribute value 
 * @property {string} text - The name of the attribute value
 * @property {String[]} children The tags of the children of the given attribute.
 * @property {number} min_state - This attribute is allowed to be defined at a given state. See states types
 * @property {Boolean} mandatory_for_submission - Attribute is required for a submission 
 * @property {Boolean} mandatory_for_active - Attribute is required for a dataset to be set active (e.g. published)
 * @property {Boolean} allow_for_user -If True the attribute can be used for a user definition. 
 * @property {Boolean} allow_for_filter -If True the attribute can be used for filtering the submissions. 
 * @property {Boolean} has_features_value -If True the attribute Values for this attribute can be a feature (e.g. protein)
 * @property {Boolean} allow_for_genotype -If True the attribute can be used to define the genotype.
 * @property {Boolean} has_numeric_input -If True the attribute can be defined by a numeric input. (e.g. user defined)
 * @property {Boolean} allow_for_dataset -If True the attribute can be define a dataset.
 * @property {Boolean} has_unit 
 * @property {String[]} unit 
 * @property {Boolean} allow_input
*/

/**
 * @typedef Trait 
 * @type {Object}
 * @property {String} tag 
 * @property {String} text 
 * @property {String} description 
 * @property {String} attribute_tag 
 * @property {Object} userInput
 */




/**
 * @typedef AttributeTraitQuery
 * @type {Object}
 * @property {String} attribute_tag
 * @property {String[]} trait_tags
 */



export default {}