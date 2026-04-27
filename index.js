import { createFeatureSequenceAPI } from "./src/hooks/features/sequence"
import { createModifyAttributesAPI } from "./src/hooks/attributes/attributes";
import { createQueryAttributesAPI} from "./src/hooks/attributes/query_attributes";
import { useDeleteFilter, useGetFilters, usePostFilter } from "./src/hooks/filters/filters";
import { createModifyAnnotationsAPI } from "./src/hooks/annotations/annotations";
import { createQueryAnnotationsAPI } from "./src/hooks/annotations/annotations_query";
import { createTermsOfUseAPI } from "./src/hooks/info/terms";
import { createFeatureInfoAPI } from "./src/hooks/features/info";
import { createSubmissionStateAPI } from "./src/hooks/submissions/state";
import { createSubmissionSamplesAPI } from "./src/hooks/submissions/samples";
import { createQueryUserRolesAPI } from "./src/hooks/users/roles";
import { createSubmissionCommentsAPI } from "./src/hooks/submissions/comments";
import { createCoreUsersAPI } from "./src/hooks/users/users";
import { createModifyTraitsAPI } from "./src/hooks/attributes/traits";
import { createCoreInstrumentsAPI } from "./src/hooks/instruments/instruments";
import { createModifySymptomsAPI } from "./src/hooks/maintenance/symptoms";
import { createQuerySymptomsAPI } from "./src/hooks/maintenance/symptoms_query";
import { createSubmissionQueryAPI } from "./src/hooks/submissions/query";
import { createSubmissionTitleAPI } from "./src/hooks/submissions/title";
import { createCoreMaintenanceEventsAPI } from "./src/hooks/maintenance/events";
import { createModifyMaintenanceProceduresAPI } from "./src/hooks/maintenance/procedures";
import { createQueryMaintenanceProceduresAPI} from "./src/hooks/maintenance/procedures_query";
import { createModifySparePartsAPI } from "./src/hooks/maintenance/spareparts";
import { createGetMaintenanceEventStatesAPI } from "./src/hooks/maintenance/states";
import { createModifyExternalServiceAPI  } from "./src/hooks/maintenance/externalservice"; 
import { createQueryExternalServiceAPI } from "./src/hooks/maintenance/externalservice_query";
import { createFeatureCorrelationAPI } from "./src/hooks/features/correlation";
import { createQueryUsersByQueryAPI } from "./src/hooks/users/query_users";
import { createQueryUserCountAPI } from "./src/hooks/users/counts";
import { createQueryUserActiveAPI } from "./src/hooks/users/active";
import { createEditUserAPI } from "./src/hooks/users/edit";
import { createSubmissionCAAPI } from "./src/hooks/submissions/ca";
import { createConditionApplicationAPI } from "./src/hooks/condition_applications/condition_applications";
import { createSampleCoreAPI } from "./src/hooks/samples/samples";
import { createMetatextAPI } from "./src/hooks/metatext/metatext";
import { createSubmissionPermissionsAPI } from "./src/hooks/submissions/permissions";
import { createNewsAPI } from "./src/hooks/news/news";
import { createSubmissionUsersAPI } from "./src/hooks/submissions/users";
import { createSubmissionViewsAPI } from "./src/hooks/submissions/views";
import { createSubmissionDurationsAPI } from "./src/hooks/stats/submissions";
import { createSubmissionQuantificationAPI } from "./src/hooks/submissions/quantifications";
import { createOpenAIAPI } from "./src/hooks/openai/cypher";
import { createSubmissionMetatextAPI} from "./src/hooks/submissions/metatexts";
import { createUserViewsAPI } from "./src/hooks/users/views";
import { createSubmissionCountAPI } from "./src/hooks/submissions/count";
import { createFeatureDataAPI } from "./src/hooks/features/data";
import { createSubmissionAnalysisAPI } from "./src/hooks/submissions/analysis";
import { createProteinFeatureQueryAPI } from "./src/hooks/features/proteins/query";
import { createSampleCountAPI } from "./src/hooks/samples/count";
import { createQueryTraitsAPI } from "./src/hooks/attributes/requires";
import { createModifyGenotypesAPI } from "./src/hooks/genotypes/insert";
import { createQueryProteomeAPI } from "./src/hooks/proteomes/find";
import { createQueryProteomeCountsAPI } from "./src/hooks/proteomes/count";
import { createPostProteomeAPI } from "./src/hooks/proteomes/insert";
import { createQueryGenotypesAPI } from "./src/hooks/genotypes/query";
import { createQueryGenotypeConditionApplicationsAPI } from "./src/hooks/genotypes/condition_applications";
import { createQuerySparePartsAPI } from "./src/hooks/maintenance/sparepart_query";
import { createGetInstrumentPermissionsAPI } from "./src/hooks/instruments/permissions";
import { createGetInstrumentSamplesCountAPI } from "./src/hooks/instruments/samples";
import { createFeatureAPI } from "./src/hooks/features/features";
import { createFeaturePairwiseQuantAPI } from "./src/hooks/features/pairwise_quant";
import { createFeatureQuantificationAPI } from "./src/hooks/features/quantifications";
import { createFeaturesProteinsRankingAPI } from "./src/hooks/features/ranking";

import { createSubmissionRunlistAPI } from "./src/hooks/submissions/runlist";
import { createSubmissionRankingAPI } from "./src/hooks/submissions/ranking";
import { createStatisticInfoAPI } from "./src/hooks/info/statistics";
import { createBackendInfoAPI} from "./src/hooks/info/backend";
import axios from "axios";
import { createAuthenticationAPI } from "./src/hooks/authorization/login";
import { createAuthenticationTokenAPI } from "./src/hooks/authorization/token";
import { createSubmissionCoreAPI } from "./src/hooks/submissions/core";
import { createStateAPI } from "./src/hooks/states/core";
import { createResearchGroupsAPI } from "./src/hooks/researchgroups/researchgroups";
import { create } from "lodash";
axios.defaults.headers.common['Content-Type'] = 'application/json';


export default {
    authorization: {
        token: {
            createAuthenticationTokenAPI
        },
        login: {
            createAuthenticationAPI
        }
    },
    metatexts: {
        createMetatextAPI
    },
    attributes: {
        createModifyAttributesAPI,
        createQueryAttributesAPI
    },
    condition_applications: {
        createConditionApplicationAPI
    },
    filters: {
        useGetFilters,
        useDeleteFilter,
        usePostFilter
    },
    annotations: {
        createModifyAnnotationsAPI,
        createQueryAnnotationsAPI
    },
    // info: {
    //     createTermsOfUseAPI,
    // },
    news: {
        createNewsAPI
    },
    users: {
        createCoreUsersAPI,
        createQueryUserRolesAPI,
        createQueryUserCountAPI,
        createQueryUserActiveAPI,
        createEditUserAPI,
        views: {
            createUserViewsAPI
        }
    },
    users_query: {
        createQueryUsersByQueryAPI
    },
    genotypes: {
        createModifyGenotypesAPI,
        createQueryGenotypesAPI,
        condition_applications : {
            createQueryGenotypeConditionApplicationsAPI
        }
    },
    features: {
        createFeatureSequenceAPI,
        createFeatureInfoAPI,
        createFeatureAPI,
        correlations: {
            createFeatureCorrelationAPI
        },
        data: {
            createFeaturePairwiseQuantAPI,
            createFeatureDataAPI
        },
        proteins: {
            createProteinFeatureQueryAPI
        },
        protein_groups : {
            createFeaturesProteinsRankingAPI
            
        },
        quantification: {
            createFeatureQuantificationAPI
        }
    },
    proteomes: {
        createQueryProteomeAPI,
        createQueryProteomeCountsAPI,
        createPostProteomeAPI
    },
    samples: {
        createSampleCountAPI,
        createSampleCoreAPI
        // useGetSample,  
        // useGetSampleConditionApplications,
        // useGetSampleGenotype,
        // useInsertSampleGenotype,
        // useUpdateSample,
        // useAddSampleGenotype
    },
    submissions: {
        
        createSubmissionCommentsAPI,
        core: {
            createSubmissionCoreAPI
        },
        title: {
            createSubmissionTitleAPI
        },
        samples: {
            createSubmissionSamplesAPI
        },
        states: {

            createSubmissionStateAPI
        },
        query: {
            createSubmissionQueryAPI
        },
        condition_applications: {
            createSubmissionCAAPI
        },
        metatexts: {
            createSubmissionMetatextAPI
            // useGetMetatexts,
            // usePostMetatext
        },
        permissions: {
            createSubmissionPermissionsAPI
        },
        users: {
            createSubmissionUsersAPI
        },
        views: {
            createSubmissionViewsAPI
        },
        quantifications: {
            createSubmissionQuantificationAPI
        },
        // researchaim: {
        //     useGetResearchAim,
        //     usePatchResearchAim
        // },
        counts: {
            createSubmissionCountAPI
        },
        analysis: {
            createSubmissionAnalysisAPI,
        },
        statistics: {
            createSubmissionRankingAPI
        },
        runlist: {
            createSubmissionRunlistAPI
        }
    },
    states: {
        createStateAPI
    },
    stats: {
        submissions: {
            createSubmissionDurationsAPI
        }
    },
    traits: {
        createModifyTraitsAPI,
        createQueryTraitsAPI
    },
    maintenance: {
        createCoreMaintenanceEventsAPI,
        procedures: {
            createModifyMaintenanceProceduresAPI,
            createQueryMaintenanceProceduresAPI
        },
        spareparts: {
            createModifySparePartsAPI,
            createQuerySparePartsAPI

        },
        symptoms: {
            createModifySymptomsAPI,
            createQuerySymptomsAPI,
        },
        states: {
            createGetMaintenanceEventStatesAPI
        },

        externalservice: {
            createModifyExternalServiceAPI,
            createQueryExternalServiceAPI,
        },
    },
    openai: {
        createOpenAIAPI
    },
    instruments: {
        createCoreInstrumentsAPI,
        permissions: {
            createGetInstrumentPermissionsAPI
        },
        samples: {
            createGetInstrumentSamplesCountAPI
        }
        
    },
    researchgroups : createResearchGroupsAPI,
    info: {
        createTermsOfUseAPI,
        createBackendInfoAPI,
        createStatisticInfoAPI,
    }
}