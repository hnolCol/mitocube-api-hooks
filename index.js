import { useGetSequenceByFeatureKey } from "./src/hooks/features/sequence"
import { createModifyAttributesAPI } from "./src/hooks/attributes/attributes";
import { createQueryAttributesAPI} from "./src/hooks/attributes/query_attributes";
import { useDeleteFilter, useGetFilters, usePostFilter } from "./src/hooks/filters/filters";
import { useGetBackendVersion } from "./src/hooks/info/version";
import { createModifyAnnotationsAPI } from "./src/hooks/annotations/annotations";
import { createQueryAnnotationsAPI } from "./src/hooks/annotations/annotations_query";
import { useGetTermsOfUse } from "./src/hooks/info/terms";
import { useGetFeatureInfo } from "./src/hooks/features/info";
import { createSubmissionStateAPI } from "./src/hooks/submissions/state";
import { useGetSubmissionSampleCount, useGetSubmissionSamplesFull, useGetSubmissionSampleTags } from "./src/hooks/submissions/samples";
import { createQueryUserRolesAPI } from "./src/hooks/users/roles";
import { useGetSubmissionComments } from "./src/hooks/submissions/comments";
import { createModifyUsersAPI } from "./src/hooks/users/users";
import { createModifyTraitsAPI } from "./src/hooks/attributes/traits";
import { useGetInstrument, useGetInstrumentsByType, useGetInstrumentState, useGetInstrumentStateByQuery, useGetInstrumentStateDurations, useGetInstrumentTypes, useGetSpecificInstrumentStateDurations, useGetStatesOfAnInstrument, usePostInstrumentState } from "./src/hooks/instruments/instruments";
import { createModifySymptomsAPI } from "./src/hooks/maintenance/symptoms";
import { createQuerySymptomsAPI } from "./src/hooks/maintenance/symptoms_query";
import { useGetSubmissionByQuery } from "./src/hooks/submissions/query";
import {  createSubmissionTitleAPI } from "./src/hooks/submissions/title";
import { useGetMaintenanceCosts, useGetQueryMaintenanceEvents, usePostMaintenanceEvent, useGetMaintenanceEventByTag, usePostSymptomToMaintenanceEvent, useDeleteSymptomToMaintenanceEvent, usePostMaintenanceProcedureToMaintenanceEvent, useDeleteMaintenanceProcedureToMaintenanceEvent, useGetMaintenanceEventCount, usePostSparePartToMaintenanceEvent, useDeleteSparePartToMaintenanceEvent, useGetSparePartCountByMaintenanceEvent, useGetMaintenanceEventState, usePostMaintenanceEventState, useGetMaintenanceEventCosts, usePostExternalServiceToMaintenanceEvent, useDeleteExternalServiceFromMaintenanceEvent} from "./src/hooks/maintenance/events";
import { createModifyMaintenanceProceduresAPI } from "./src/hooks/maintenance/procedures";
import { createQueryMaintenanceProceduresAPI} from "./src/hooks/maintenance/procedures_query";
import { createModifySparePartsAPI } from "./src/hooks/maintenance/spareparts";
import { useGetMaintenanceEventStates } from "./src/hooks/maintenance/states";
import { createModifyExternalServiceAPI  } from "./src/hooks/maintenance/externalservice"; 
import { createQueryExternalServiceAPI } from "./src/hooks/maintenance/externalservice_query";
import { useGetFeatureCorrelation } from "./src/hooks/features/correlation";
import { createQueryUsersByQueryAPI } from "./src/hooks/users/query_users";
import { createQueryUserCountAPI } from "./src/hooks/users/counts";
import { createQueryUserActiveAPI } from "./src/hooks/users/active";
import { useGetSubmissionConditionApplication, useGetSubmissionConditionApplicationAttributes, useGetSubmissionSampleConditionApplications, useGetSubmissionSampleConditionApplicationAttributes, useGetSubmissionConditionApplicationData, useUpdateSubmissionCA } from "./src/hooks/submissions/ca";
import { createConditionApplicationAPI } from "./src/hooks/condition_applications/condition_applications";
import { createSampleCoreAPI } from "./src/hooks/samples/samples";
import { createMetatextAPI } from "./src/hooks/metatext/metatext";
import { createSubmissionPermissionsAPI } from "./src/hooks/submissions/permissions";
import { createNewsAPI } from "./src/hooks/news/news";
import { useGetSubmissionUsers } from "./src/hooks/submissions/users";
import { useGetSubmissionViews, usePostSubmissionView } from "./src/hooks/submissions/views";
import { useGetSubmissionDuration } from "./src/hooks/stats/submissions";
import { useGetSubmissionQuantificationExists, usePostPrecursorQuantification, usePostProteinQuantification } from "./src/hooks/submissions/quantifications";
import { useGetCypherQuery, useGetPublicationSummaryForProtein } from "./src/hooks/openai/cypher";
import { createSubmissionMetatextAPI} from "./src/hooks/submissions/metatexts";
import { createUserViewsAPI } from "./src/hooks/users/views";
import { useGetSubmissionPeptideCount, useGetSubmissionProteinGroupCount, useGetSubmissionSampleProteinGroupCount } from "./src/hooks/submissions/count";
import { useGetFeaturesByQuery } from "./src/hooks/features/query";
import { useGetFeatureDataForSubmission } from "./src/hooks/features/data";
import { createSubmissionAnalysisAPI } from "./src/hooks/submissions/analysis";
import { useGetProteinFeatureByQuery } from "./src/hooks/features/proteins/query";
import { useGetProteinByTag } from "./src/hooks/features/proteins/get";
import { createSampleCountAPI } from "./src/hooks/samples/count";
import { createQueryTraitsAPI } from "./src/hooks/attributes/requires";
import { createModifyGenotypesAPI } from "./src/hooks/genotypes/insert";
import { useGetProteome, useGetProteomeCreatedAt, useGetProteomeIsUpdating, useGetProteomeText } from "./src/hooks/proteomes/get";
import { useGetProteomeBySearchString } from "./src/hooks/proteomes/find";
import { useGetProteomeCount, useGetProteomeProteinCount } from "./src/hooks/proteomes/count";
import { usePostProteome } from "./src/hooks/proteomes/insert";
import { useGetProteomePermissions } from "./src/hooks/proteomes/permissions";
import { createQueryGenotypesAPI } from "./src/hooks/genotypes/query";
import { createQueryGenotypeConditionApplicationsAPI } from "./src/hooks/genotypes/condition_applications";
import { createQuerySparePartsAPI } from "./src/hooks/maintenance/sparepart_query";
import { useGetInstrumentPermissions } from "./src/hooks/instruments/permissions";
import { useGetInstrumentSamplesCount } from "./src/hooks/instruments/samples";
import { useGetFeatureByTag } from "./src/hooks/features/features";
import { useGetPairwiseFeatureQuant } from "./src/hooks/features/pairwise_quant";
import { useGetSampleAbundance, useGetSampleFeatureAbundanceDistribution } from "./src/hooks/features/quantifications";
import { useGetProteinGroupSubmissionStats } from "./src/hooks/features/ranking";

import { useGetSubmissionExclusivelyQuantifiedProteinGroups, useGetSubmissionRanking, useUpdateSubmissionStats } from "./src/hooks/submissions/ranking";
import { useGetStatisticInfo } from "./src/hooks/info/statistics";
import { createBackendInfoAPI} from "./src/hooks/info/backend";
import axios from "axios";
import { createAuthenticationAPI } from "./src/hooks/authorization/login";
import { createAuthenticationTokenAPI } from "./src/hooks/authorization/token";
import { createSubmissionCoreAPI } from "./src/hooks/submissions/core";
import { createStateAPI } from "./src/hooks/states/core";
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
    info: {
        useGetTermsOfUse,
    },
    news: {
        createNewsAPI
    },
    users: {
        createModifyUsersAPI,
        createQueryUserRolesAPI,
        createQueryUserCountAPI,
        createQueryUserActiveAPI,
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
        useGetFeaturesByQuery,
        useGetSequenceByFeatureKey,
        useGetFeatureInfo,
        useGetFeatureByTag,
        correlations: {
            useGetFeatureCorrelation
        },
        data: {
            useGetFeatureDataForSubmission,
            useGetPairwiseFeatureQuant
        },
        proteins: {
            useGetProteinFeatureByQuery,
            useGetProteinByTag
        },
        protein_groups : {
            useGetProteinGroupSubmissionStats
            
        },
        quantification: {
            useGetSampleAbundance,
            useGetSampleFeatureAbundanceDistribution
        }
    },
    proteomes: {
        useGetProteome,
        useGetProteomeText,
        useGetProteomeBySearchString,
        useGetProteomeCount,
        useGetProteomeProteinCount,
        usePostProteome,
        useGetProteomeIsUpdating,
        useGetProteomePermissions,
        useGetProteomeCreatedAt
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
        
        useGetSubmissionComments,
        core: {
            createSubmissionCoreAPI
        },
        title: {
            createSubmissionTitleAPI
        },
        samples: {
            useGetSubmissionSampleTags,
            useGetSubmissionSampleCount,
            useGetSubmissionSamplesFull
        },
        states: {

            createSubmissionStateAPI
        },
        query: {
            useGetSubmissionByQuery
        },
        condition_applications: {

            useGetSubmissionConditionApplication,
            useGetSubmissionSampleConditionApplicationAttributes,
            useGetSubmissionConditionApplicationAttributes,
            useGetSubmissionSampleConditionApplications,
            useGetSubmissionConditionApplicationData,
            useUpdateSubmissionCA
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
            useGetSubmissionUsers
        },
        views: {
            useGetSubmissionViews,
            usePostSubmissionView
        },
        quantifications: {
            usePostProteinQuantification,
            usePostPrecursorQuantification,
            useGetSubmissionQuantificationExists,
        },
        // researchaim: {
        //     useGetResearchAim,
        //     usePatchResearchAim
        // },
        counts: {
            useGetSubmissionProteinGroupCount,
            useGetSubmissionSampleCount, 
            useGetSubmissionPeptideCount,
            useGetSubmissionSampleProteinGroupCount,
        },
        analysis: {
            createSubmissionAnalysisAPI,
        },
        statistics: {
            useUpdateSubmissionStats,
            useGetSubmissionRanking,
            useGetSubmissionExclusivelyQuantifiedProteinGroups

        }
    },
    states: {
        createStateAPI
    },
    stats: {
        submissions: {
            useGetSubmissionDuration
        }
    },
    traits: {
        createModifyTraitsAPI,
        createQueryTraitsAPI
    },
    maintenance: {
        usePostMaintenanceEvent,
        useGetQueryMaintenanceEvents,
        useGetMaintenanceEventCount,
        useGetMaintenanceEventByTag,
        usePostSymptomToMaintenanceEvent,
        useDeleteSymptomToMaintenanceEvent,
        usePostMaintenanceProcedureToMaintenanceEvent,
        useDeleteMaintenanceProcedureToMaintenanceEvent,
        usePostSparePartToMaintenanceEvent,
        useDeleteSparePartToMaintenanceEvent,
        useGetSparePartCountByMaintenanceEvent,
        useGetMaintenanceEventState,
        usePostMaintenanceEventState,
        useGetMaintenanceEventCosts,
        usePostExternalServiceToMaintenanceEvent,
        useDeleteExternalServiceFromMaintenanceEvent,
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
        
        costs: {
            useGetMaintenanceCosts
        },
        states: {
            useGetMaintenanceEventStates
        },

        externalservice: {
            createModifyExternalServiceAPI,
            createQueryExternalServiceAPI,
        },
    },
    openai: {
        useGetCypherQuery,
        useGetPublicationSummaryForProtein
    },
    instruments: {
        useGetInstrument,
        useGetInstrumentsByType,
        useGetInstrumentTypes,
        useGetStatesOfAnInstrument,
        states: {
            useGetInstrumentStateDurations,
            useGetSpecificInstrumentStateDurations,
            useGetInstrumentState,
            useGetInstrumentStateByQuery,
            usePostInstrumentState
        },
        permissions: {
            useGetInstrumentPermissions
        },
        samples: {
            useGetInstrumentSamplesCount
        }
        
    },
    info: {
        createBackendInfoAPI,
        useGetStatisticInfo,
    }
}