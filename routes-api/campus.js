'use strict';

const handlers = require('../handlers');
const lib = require('../lib');

function campusApi (apiRouter) {
  apiRouter.get('/campus/jobs',
    lib.params,
    handlers.campus.getCampusJobs.logic,
    handlers.campus.getCampusJobs.response);

  apiRouter.get('/campus/job/:jobId',
    lib.params,
    handlers.campus.getCampusJob.validateParams,
    handlers.campus.getCampusJob.logic,
    handlers.campus.getCampusJob.response);

  apiRouter.put('/campus/job/:jobId',
    lib.params,
    handlers.campus.updateCampusJob.validateParams,
    handlers.campus.updateCampusJob.logic,
    handlers.campus.updateCampusJob.response);

  apiRouter.get('/campus/:campusId/marketplace',
    lib.params,
    handlers.campus.getCampusMarketplaceByCampusId.validateParams,
    lib.isTokenExist.user,
    handlers.campus.getCampusMarketplaceByCampusId.logic,
    handlers.campus.getCampusMarketplaceByCampusId.response);

  apiRouter.get('/campus/marketplace/:marketplaceId',
    lib.params,
    handlers.campus.getCampusMarketplaceByMarketplaceId.validateParams,
    lib.isTokenExist.user,
    handlers.campus.getCampusMarketplaceByMarketplaceId.logic,
    handlers.campus.getCampusMarketplaceByMarketplaceId.response);

  apiRouter.post('/campus/marketplace',
    lib.params,
    handlers.campus.postCampusMarketplace.validateParams,
    lib.isTokenExist.user,
    lib.upload.multiple,
    handlers.campus.postCampusMarketplace.logic,
    handlers.campus.postCampusMarketplace.saveCampusMarketplacePhotos,
    handlers.campus.postCampusMarketplace.response);

  apiRouter.delete('/marketplace/:marketplaceId',
    lib.params,
    handlers.campus.removeCampusMarketplace.validateParams,
    lib.isTokenExist.user,
    handlers.campus.removeCampusMarketplace.logic,
    handlers.campus.removeCampusMarketplace.response);
}

module.exports = campusApi;
