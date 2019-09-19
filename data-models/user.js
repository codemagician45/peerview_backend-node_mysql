'use strict';

module.exports = function (sequelize, dataTypes) {
  const User = sequelize.define('user', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: dataTypes.STRING
    },
    lastName: {
      type: dataTypes.STRING
    },
    password: {
      type: dataTypes.STRING
    },
    email: {
      type: dataTypes.STRING
    },
    language: {
      type: dataTypes.STRING
    },
    aboutMe: {
      type: dataTypes.STRING
    },
    accomplishments: {
      type: dataTypes.STRING
    },
    token: {
      type: dataTypes.STRING
    },
    tokenActiveDate: {
      type: dataTypes.DATE
    },
    isSuspended: {
      type: dataTypes.BOOLEAN
    },
    profilePicture: {// use in local sign-up
      type: dataTypes.STRING,
      defaultValue: 'avatar'
    },
    socialImage: {// use this when sign-up using social
      type: dataTypes.STRING,
    },
    profilePrivacy: {// direct Message
      type: dataTypes.BOOLEAN,
      defaultValue: 0
    },
    protectPost: {
      type: dataTypes.BOOLEAN,
      defaultValue: 1
    },
    facebookId: {
      type: dataTypes.STRING
    },
    linkedinId: {
      type: dataTypes.STRING
    },
    googleId: {
      type: dataTypes.STRING
    },
    schoolName: {
      type: dataTypes.STRING
    },
    birthDate: {
      type: dataTypes.DATE
    },
    city: {
      type: dataTypes.STRING
    },
    gender: {
      type: dataTypes.STRING
    },
    role: {// start of ex-student which includes birthDate and city
      type: dataTypes.STRING
    },
    company: {
      type: dataTypes.STRING
    },
    institutionName: {// start of institution or organization which includes city
      type: dataTypes.STRING
    },
    yearOfIncorporation: {
      type: dataTypes.DATE
    },
    website: {
      type: dataTypes.STRING
    },
    email_send_date: {
      type: dataTypes.DATE
    },
    email_verify_code: {
      type: dataTypes.INTEGER
    },
    last_logging_time: {
      type: dataTypes.DATE
    },
    facebook_profile: {
      type: dataTypes.STRING
    },
    twitter_profile: {
      type: dataTypes.STRING
    },
    instagram_profile: {
      type: dataTypes.STRING
    },
    snapchat_profile: {
      type: dataTypes.STRING
    },
    gpa: {
      type: dataTypes.STRING
    },
    name: {
      type: dataTypes.VIRTUAL,
      get: function () {
        return `${this.get('firstName')} ${this.get('lastName')}`;
      }
    }
  }, {
    tableName: 'user',
    timestamp: true,
    collate: 'utf8_unicode_ci',
    indexes: []
  });

  User.associate = function (models) {
    this.hasMany(models.userCredits);
    this.belongsTo(models.userType);
    this.belongsTo(models.userPrivacy);// who can view my profile
    this.belongsTo(models.campus, {
      as: 'campus'
    });
    this.hasMany(models.userCourse);
    this.hasMany(models.communityUsers);
    this.hasMany(models.communityUsers);
    this.hasMany(models.event);
    this.hasMany(models.userInterest);
    this.hasMany(models.postPollOptionSummary, {
      as: 'postPollOptionSummary'
    });
    this.hasMany(models.userFollower, {
      foreignKey: 'followeeId',
      as: 'followee'
    });
    this.hasMany(models.userFollower, {
      foreignKey: 'followerId',
      as: 'follower'
    });
    this.hasMany(models.userSkill);
    this.hasMany(models.workExperience);
    this.belongsToMany(models.postv1, {through: models.followPost});
    this.hasMany(models.campusUser);
    this.belongsToMany(models.campus, {through: models.campusUser});
  };

  User.prototype.isUserAlreadyFollowed = async function (peersList, db, userId) {
    peersList = await Promise.all(peersList.map(async (peer) => {
      let isUserAlreadyFollowed = false;
      const contents = await db.userFollower.count({
        where: {
          followerId: userId,
          followeeId: peer.id
        }
      });

      if (contents > 0) {
        isUserAlreadyFollowed = true;
      }

      peer.dataValues.isUserAlreadyFollowed = isUserAlreadyFollowed;
      return peer;
    }));

    return peersList;
  };

  return User;
};
