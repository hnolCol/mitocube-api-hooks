import { useGetSequenceByFeatureKey } from "./src/hooks/features/sequence"
import { useGetAttribute, usePostAttribute, usePostAttributeValues, useUpdateAttributeValue } from "./src/hooks/attributes/attributes";
import { useGetAttributesByQuery } from "./src/hooks/attributes/query_attributes";
import { useDeleteFilter, useGetFilters, usePostFilter } from "./src/hooks/filters/filters";
import { useGetAnnotationsByTag, useGetAnnotationsBySearchString, useGetAnnotationsByProteinTag, usePostAnnotations, useGetAnnotationGroupByTag, usePostAnnotationGroup, useGetAnnotationGroupByQuery, useGetAnnotationProteinCount, useGetAnnotationsByGroupTag, useGetAnnotationGroupCount, useDeleteAnnotations, useUpdateAnnotations, useUpdateAnnotationGroup, useGetIsProteinInAnnotation } from "./src/hooks/annotations/annotations";
import { useGetAnnotationPermissions } from "./src/hooks/annotations/permissions";
import { useGetTermsOfUse } from "./src/hooks/info/terms";
import { useGetFeatureInfo } from "./src/hooks/features/info";
import { useGetStates, useGetSubmissionState, useGetSubmissionStateCount, usePatchSubmissionState } from "./src/hooks/submissions/state";
import { useGetSubmissionSampleCount, useGetSubmissionSamplesFull, useGetSubmissionSampleTags } from "./src/hooks/submissions/samples";
import { useGetUserRoleByTag, useGetUserRoles } from "./src/hooks/users/roles";
import { useGetSubmissionComments } from "./src/hooks/submissions/comments";
import { useGetPublicUserByTag, usePatchUser, usePostUser } from "./src/hooks/users/users";
import { useGetAttributeChildren } from "./src/hooks/attributes/children";
import { useDeleteTrait, useGetTraitBySearchString, useGetTraitByTag, useGetTraitCount, useGetTraitDescription, useGetTraitPermissions, useGetTraitPriority, useGetTraitsByAttributeTag, useGetTraitText, usePostTrait, useUpdateTrait } from "./src/hooks/attributes/traits";
import { useGetInstrument, useGetInstrumentsByType, useGetInstrumentState, useGetInstrumentStateByQuery, useGetInstrumentStateDurations, useGetInstrumentTypes, useGetSpecificInstrumentStateDurations, useGetStatesOfAnInstrument, usePostInstrumentState } from "./src/hooks/instruments/instruments";
import { useGetSymptomByQuery, useGetSymptomByTag, useCheckSymptomExists, useEditSymptom, useGetSymptoms, usePostSymptom, useDeleteSymptom, useGetSymptomDescription,useGetSymptomText, useGetSymptomPriority } from "./src/hooks/maintenance/symptoms";
import { useGetSymptomsPermissions } from "./src/hooks/maintenance/symptomspermissions";
import { useGetSubmissionByQuery } from "./src/hooks/submissions/query";
import {  createSubmissionTitleAPI } from "./src/hooks/submissions/title";
import { useGetAttributeByGroup, useGetAttributeGroups } from "./src/hooks/attributes/groups";
import { useGetMaintenanceCosts, useGetQueryMaintenanceEvents, usePostMaintenanceEvent, useGetMaintenanceEventByTag, usePostSymptomToMaintenanceEvent, useDeleteSymptomToMaintenanceEvent, usePostMaintenanceProcedureToMaintenanceEvent, useDeleteMaintenanceProcedureToMaintenanceEvent, useGetMaintenanceEventCount, usePostSparePartToMaintenanceEvent, useDeleteSparePartToMaintenanceEvent, useGetSparePartCountByMaintenanceEvent, useGetMaintenanceEventState, usePostMaintenanceEventState, useGetMaintenanceEventCosts, usePostExternalServiceToMaintenanceEvent, useDeleteExternalServiceFromMaintenanceEvent} from "./src/hooks/maintenance/events";
import { useGetMaintenanceProcedureByQuery, useGetMaintenanceProcedureByTag, useCheckMaintenanceProcedureExists, useGetMaintenanceProcedures, useGetMaintenanceProcedureText, useGetMaintenanceProcedureDescription, useGetMaintenanceProcedurePriority, usePostMaintenanceProcedure, useEditMaintenanceProcedure, useDeleteMaintenanceProcedure} from "./src/hooks/maintenance/procedures";
import { useGetSparePartByQuery, useGetSparePartByTag, useGetSparePartText, useGetSparePartDescription, useGetSparePartCompany, useGetSparePartProductID, useGetSparePartPrice, useGetSparePartLink, usePostSparePart, useUpdateSparePart, useDeleteSparePart } from "./src/hooks/maintenance/spareparts";
import { useGetMaintenanceEventStates } from "./src/hooks/maintenance/states";
import { useGetExternalServiceByTag, useGetExternalServiceByQuery, usePostExternalService, useUpdateExternalService, useDeleteExternalService, useGetExternalServiceDescription, useGetExternalServiceName, useGetExternalServiceCompany, useGetExternalServiceEmail, useGetExternalServiceCosts, useGetExternalServiceBillingNumber, useGetExternalServiceInternalID  } from "./src/hooks/maintenance/externalservice"; 
import { useGetFeatureCorrelation } from "./src/hooks/features/correlation";

import { useGetUserByQuery } from "./src/hooks/users/query_users";
import { useGetUserCount } from "./src/hooks/users/counts";
import { useGetUserIsActive } from "./src/hooks/users/active";
import { useGetAttributeCount } from "./src/hooks/attributes/count";
import { useGetAttributeMinState } from "./src/hooks/attributes/state";
import { useGetSubmissionConditionApplication, useGetSubmissionConditionApplicationAttributes, useGetSubmissionSampleConditionApplications, useGetSubmissionSampleConditionApplicationAttributes, useGetSubmissionConditionApplicationData, useUpdateSubmissionCA } from "./src/hooks/submissions/ca";
import { createConditionApplicationAPI } from "./src/hooks/condition_applications/condition_applications";
import { useInsertSampleGenotype, useGetSample, useGetSampleConditionApplications, useGetSampleGenotype, useUpdateSample, useAddSampleGenotype } from "./src/hooks/samples/samples";
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
import { useGetSampleCount } from "./src/hooks/samples/count";
import { useGetRequiredTraits } from "./src/hooks/attributes/requires";
import { usePostGenotype } from "./src/hooks/genotypes/insert";
import { useGetProteome, useGetProteomeCreatedAt, useGetProteomeIsUpdating, useGetProteomeText } from "./src/hooks/proteomes/get";
import { useGetProteomeBySearchString } from "./src/hooks/proteomes/find";
import { useGetProteomeCount, useGetProteomeProteinCount } from "./src/hooks/proteomes/count";
import { usePostProteome } from "./src/hooks/proteomes/insert";
import { useGetProteomePermissions } from "./src/hooks/proteomes/permissions";
import { useGetGenotypesBySearchString } from "./src/hooks/genotypes/query";
import { useGetGenotypeText } from "./src/hooks/genotypes/text";
import { useGetGenotypeDescription } from "./src/hooks/genotypes/description";
import { useGetGenotypeItem } from "./src/hooks/genotypes/item";
import { useGetGenotypeProteins, useGetGenotypeProteome } from "./src/hooks/genotypes/proteins";
import { useGetGenotypeSampleCount } from "./src/hooks/genotypes/countsamples";
import { useDeleteGenotype } from "./src/hooks/genotypes/delete";
import { useGetGenotypePermissions } from "./src/hooks/genotypes/permission";
import { useEditGenotype } from "./src/hooks/genotypes/edit";
import { useGetGenotypeConditionApplications, useGetGenotypeConditionApplicationsData } from "./src/hooks/genotypes/condition_applications";
import { useGetSparepartPermissions } from "./src/hooks/maintenance/sparepartpermissions";
import { useGetProcedurePermissions } from "./src/hooks/maintenance/procedurespermissions";
import { useGetExternalServicePermissions } from "./src/hooks/maintenance/externalservicepermissions";
import { useGetInstrumentPermissions } from "./src/hooks/instruments/permissions";
import { useGetInstrumentSamplesCount } from "./src/hooks/instruments/samples";
import { useGetFeatureByTag } from "./src/hooks/features/features";
import { useGetPairwiseFeatureQuant } from "./src/hooks/features/pairwise_quant";
import { useGetSampleAbundance, useGetSampleFeatureAbundanceDistribution } from "./src/hooks/features/quantifications";
import { useGetProteinGroupSubmissionStats } from "./src/hooks/features/ranking";

import { useGetSubmissionExclusivelyQuantifiedProteinGroups, useGetSubmissionRanking, useUpdateSubmissionStats } from "./src/hooks/submissions/ranking";
import { useGetGenotypeExists } from "./src/hooks/genotypes/exists";
import { useGetStatisticInfo } from "./src/hooks/info/statistics";
import { createBackendInfoAPI} from "./src/hooks/info/backend";
import axios from "axios";
import { createAuthenticationAPI } from "./src/hooks/authorization/login";
import { createAuthenticationTokenAPI } from "./src/hooks/authorization/token";
import { createSubmissionCoreAPI } from "./src/hooks/submissions/core";
import { createStateAPI } from "./src/hooks/states/core";
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
        useGetAttribute,
        usePostAttribute,
        usePostAttributeValues,
        useUpdateAttributeValue,
        useGetAttributeChildren,
        useGetAttributeCount,
        useGetAttributeMinState,
        useGetRequiredTraits,
        groups: {
            useGetAttributeByGroup,
            useGetAttributeGroups
        }
    },
    attributes_query: {
        useGetAttributesByQuery
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
        useGetAnnotationsByTag,
        useGetAnnotationsBySearchString,
        useGetAnnotationsByProteinTag,
        usePostAnnotations,
        useGetAnnotationGroupByTag,
        usePostAnnotationGroup,
        useGetAnnotationGroupByQuery,
        useGetAnnotationGroupCount,
        useGetAnnotationProteinCount,
        useGetAnnotationsByGroupTag,
        useDeleteAnnotations,
        useUpdateAnnotations,
        useUpdateAnnotationGroup,
        proteins: {
            useGetIsProteinInAnnotation
        }
    },
    annotationspermissions: {
        useGetAnnotationPermissions
    },
    info: {
        useGetTermsOfUse,
    },
    news: {
        createNewsAPI
    },
    users: {
        useGetUserRoles,
        useGetUserRoleByTag,
        useGetPublicUserByTag,
        useGetUserCount,
        useGetUserIsActive,
        usePostUser,
        usePatchUser,
        views: {
            createUserViewsAPI
        }
    },
    users_query: {
        useGetUserByQuery
    },
    genotypes: {
        usePostGenotype,
        useGetGenotypeExists,
        useGetGenotypesBySearchString,
        useGetGenotypeText,
        useGetGenotypeDescription,
        useGetGenotypeItem,
        useGetGenotypeProteins,
        useGetGenotypeSampleCount,
        useDeleteGenotype,
        useGetGenotypePermissions, 
        useEditGenotype,
        useGetGenotypeProteome,
        condition_applications : {
            useGetGenotypeConditionApplications,
            useGetGenotypeConditionApplicationsData
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
        useGetSample,  
        useGetSampleConditionApplications,
        useGetSampleCount, 
        useGetSampleGenotype,
        useInsertSampleGenotype,
        useUpdateSample,
        useAddSampleGenotype
    },
    submissions: {
        
        useGetSubmissionStateCount,
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
            usePatchSubmissionState,
            useGetSubmissionState,
            useGetStates
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
        useGetTraitBySearchString,
        useGetTraitByTag,
        useGetTraitCount,
        useGetTraitsByAttributeTag,
        usePostTrait,
        useGetTraitText,
        useGetTraitDescription,
        useGetTraitPriority,
        useUpdateTrait,
        useDeleteTrait,
        useGetTraitPermissions
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
            useGetMaintenanceProcedureByQuery,
            useGetMaintenanceProcedureByTag,
            useCheckMaintenanceProcedureExists, 
            useGetMaintenanceProcedures, 
            useGetMaintenanceProcedureText, 
            useGetMaintenanceProcedureDescription, 
            useGetMaintenanceProcedurePriority, 
            usePostMaintenanceProcedure, 
            useEditMaintenanceProcedure, 
            useDeleteMaintenanceProcedure 
        },
        procedurespermissions: {
            useGetProcedurePermissions
        },
        spareparts: {
            useGetSparePartByQuery,
            useGetSparePartByTag,
            useGetSparePartText, 
            useGetSparePartDescription, 
            useGetSparePartCompany, 
            useGetSparePartProductID, 
            useGetSparePartPrice, 
            useGetSparePartLink, 
            usePostSparePart, 
            useUpdateSparePart, 
            useDeleteSparePart 
        },
        sparepartpermissions: {
            useGetSparepartPermissions
        },
        symptoms: {
            useGetSymptomByQuery,
            useGetSymptomByTag,
            useCheckSymptomExists,
            useGetSymptomDescription,
            useGetSymptomText,
            useGetSymptomPriority,
            useEditSymptom,
            useGetSymptoms,
            usePostSymptom,
            useDeleteSymptom
        },

        symptomspermissions: {
            useGetSymptomsPermissions
        },
        
        costs: {
            useGetMaintenanceCosts
        },
        states: {
            useGetMaintenanceEventStates
        },

        externalservice: {
            useGetExternalServiceByTag, 
            useGetExternalServiceByQuery,
            usePostExternalService, 
            useUpdateExternalService, 
            useDeleteExternalService, 
            useGetExternalServiceDescription, 
            useGetExternalServiceName, 
            useGetExternalServiceCompany, 
            useGetExternalServiceEmail, 
            useGetExternalServiceCosts, 
            useGetExternalServiceBillingNumber, 
            useGetExternalServiceInternalID
        },

        externalservicepermissions: {
            useGetExternalServicePermissions
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