import testConfig from "../../test.config"
import { getSubmissionState_API } from "../hooks/submissions/state"
import _ from "lodash"

const submission_tag = testConfig.submission_tag


test('State of a submission check.', async () => {
    const res = getSubmissionState_API({tag : feature_tag})
    if (!_.isNumber(res.data)) throw Error("Returned submission is not a number.")
})