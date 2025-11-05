import { getSequenceByFeatureTag_API } from "../hooks/features/sequence";
import testConfig from "../../test.config"

const bearer_token = 'Bearer ' + testConfig.TOKEN
const feature_tag = "Q9D164"

test('Test hook of feature sequence', async () => {
  const res = await getSequenceByFeatureTag_API({tag : feature_tag})
  console.log(res)
  console.log(res.sequence)
  
}) 
 