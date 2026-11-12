import { useMutation } from "@tanstack/react-query"

export function createPTMPrecursorAPI(client) {
    /**
     * @description Inserts a PTM precursor (a modified precursor with at least one modification) into the database. The precursor tag is derived from the modified sequence and the charge, so modified and unmodified forms stay distinct measured species. Requires at least curator rights. Endpoint: POST '/api/features/ptm_precursors/insert'
     * @param {Object} props
     * @param {String} props.sequence - The modified sequence string in engine notation (e.g. PEPTS[Phospho]IDEK or PEPTS(79.966331)IDEK).
     * @param {Number} props.charge - The charge of the precursor.
     * @param {Number} [props.mz] - The mass-to-charge ratio of the precursor.
     * @param {Number} [props.im] - The ion mobility of the precursor.
     * @param {Number} [props.value] - The log2 intensity of the precursor quantification.
     * @param {Number} [props.score] - The identification score of the precursor.
     * @param {String[]} [props.protein_group_tags] - The tags of the protein groups the precursor belongs to.
     * @param {String} [props.protein_tag] - The tag of the protein the precursor is localized to.
     * @param {Object[]} props.modifications - The modifications of the precursor (unique positions, at least one entry required).
     * @param {Number} props.modifications.position - The position of the modification.
     * @param {String} props.modifications.modification - The modification as a UniMod accession (e.g. "21"), name (e.g. "Phospho") or monoisotopic mass (e.g. "79.966331").
     * @param {String} [props.modifications.residue] - The modified residue.
     * @returns {Boolean} True if the insertion was successful. 404 if a protein group does not exist, 400 if a modification cannot be resolved to a UniMod entry.
     */
    async function postPTMPrecursor_API({ sequence, charge, mz, im, value, score, protein_group_tags, protein_tag, modifications }) {
        const res = await client.post(`/features/ptm_precursors/insert`, {
            sequence, charge, mz, im, value, score, protein_group_tags, protein_tag, modifications
        })
        return res.data
    }

    const usePostPTMPrecursor = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postPTMPrecursor_API({ ...APIParams }),
            ...useMutationOptions
        });
    }

    /**
     * @description Bulk inserts PTM precursors into the database. Requires at least curator rights. Endpoint: POST '/api/features/ptm_precursors/insert/bulk'
     * @param {Object} props
     * @param {Object[]} props.ptm_precursors - The PTM precursors to insert.
     * @param {Number} [props.batch_size=1000] - The number of PTM precursors sent to the database per query.
     * @param {Number} [props.transaction_batch_size=400] - The number of rows per internal transaction.
     * @returns {Object} The bulk insert report (valid, not_found, not_found_tags). 400 if the body is empty, the batch sizes are invalid or a modification cannot be resolved to a UniMod entry.
     */
    async function postPTMPrecursorsBulk_API({ ptm_precursors, batch_size, transaction_batch_size }) {
        const res = await client.post(`/features/ptm_precursors/insert/bulk`, ptm_precursors, {
            params: { batch_size, transaction_batch_size }
        })
        return res.data
    }

    const usePostPTMPrecursorsBulk = (useMutationOptions = {}) => {
        return useMutation({
            mutationFn: (APIParams) => postPTMPrecursorsBulk_API({ ...APIParams }),
            ...useMutationOptions
        });
    }

    return {
        usePostPTMPrecursor,
        usePostPTMPrecursorsBulk
    };
}
