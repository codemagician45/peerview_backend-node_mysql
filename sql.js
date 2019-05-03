/*eslint-disable max-lines*/
'use strict';

const db = require(__dirname + '/lib/db');
const randomstring = require('randomstring');
const md5 = require('MD5');

function cleanUp () {
  return db.sync({force: false});
}

return cleanUp()
.then(() => {
  return db.models.userType.bulkCreate([{
    id: 1,
    code: 'student',
    name: 'Student'
  }, {
    id: 2,
    code: 'professionals',
    name: 'Ex-student'
  }, {
    id: 3,
    code: 'organizationInstitution',
    name: 'Organization/Institution'
  }]);
})// below will be a test data for login
.then(() => {
  return db.models.campus.create({
    id: 1,
    name: 'Peersview Campus',
    email: 'peersview@peersview.com',
    password: md5(12345678)
  });
})
.then(() => {
  return db.models.campusFreshersFeed.create({
    campusId: 1,
    name: '2013/14 Academic Year',
    schoolYearStart: '2013',
    schoolYearEnd: '2014'
  });
})
.then(() => {
  return db.models.user.create({
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test.com',
    password: md5(12345678),
    token: randomstring.generate(),
    campusId: 1
  });
})
.then(() => {
  return db.models.eventType.bulkCreate([{
    name: 'Featured Event'
  }, {
    name: 'Standard Event'
  }]);
})
.then(() => {
  let eventDressCodes = [{
    name: 'smart'
  }, {
    name: 'casual'
  }, {
    name: 'fancy'
  }, {
    name: 'smart casual'
  }];

  return db.models.eventDressCode.bulkCreate(eventDressCodes);
})
.then(() => {
  return db.models.country.create({
    code: 'CA',
    name: 'CANADA'
  });
})
.then(() => {
  return db.models.campusPrivacy.bulkCreate([{
    id: 1,
    name: 'public',
    description: 'Visible to everyone'
  }, {
    id: 2,
    name: 'private',
    description: 'User must request to join group'
  }, {
    id: 3,
    name: 'secret',
    description: 'User must receive invite before they can join'
  }]);
})
.then(() => {
  return db.models.campusJobType.bulkCreate([{
    code: 'contract',
    description: 'Contractual'
  }, {
    code: 'parttime',
    description: 'Partime Job'
  }, {
    code: 'fulltime',
    description: 'Full Time Job'
  }]);
})
.then(() => {
  let cities = [{
    'name': 'TORONTO',
    'countryCode': 'CA'
  }, {
    'name': 'GUELPH',
    'countryCode': 'CA'
  }, {
    'name': 'VANCOUVER',
    'countryCode': 'CA'
  }, {
    'name': 'MONTREAL',
    'countryCode': 'CA'
  }, {
    'name': 'OTTAWA',
    'countryCode': 'CA'
  }, {
    'name': 'LONDON',
    'countryCode': 'CA'
  }, {
    'name': 'HALIFAX',
    'countryCode': 'CA'
  }, {
    'name': 'VICTORIA',
    'countryCode': 'CA'
  }, {
    'name': 'WATERLOO',
    'countryCode': 'CA'
  }, {
    'name': 'WINDSOR',
    'countryCode': 'CA'
  }, {
    'name': 'KINGSTON',
    'countryCode': 'CA'
  }, {
    'name': 'QUEBEC CITY',
    'countryCode': 'CA'
  }, {
    'name': 'KELOWNA',
    'countryCode': 'CA'
  }, {
    'name': 'WINNIPEG',
    'countryCode': 'CA'
  }, {
    'name': 'MONCTON',
    'countryCode': 'CA'
  }, {
    'name': 'ABBOTSFORD',
    'countryCode': 'CA'
  }, {
    'name': 'CALGARY',
    'countryCode': 'CA'
  }, {
    'name': 'FREDERICTON',
    'countryCode': 'CA'
  }, {
    'name': 'BURNABY',
    'countryCode': 'CA'
  }, {
    'name': 'HAMILTON',
    'countryCode': 'CA'
  }, {
    'name': 'SASKATOON',
    'countryCode': 'CA'
  }, {
    'name': 'ST. CATHERINES',
    'countryCode': 'CA'
  }, {
    'name': 'REGINA',
    'countryCode': 'CA'
  }, {
    'name': 'EDMONTON',
    'countryCode': 'CA'
  }, {
    'name': 'MISSISSAUGA',
    'countryCode': 'CA'
  }, {
    'name': 'SHERBROOKE',
    'countryCode': 'CA'
  }, {
    'name': 'THUNDERBAY',
    'countryCode': 'CA'
  }];

  return db.models.city.bulkCreate(cities);
})
.then(() => {
  return db.models.course.bulkCreate([{
    id: 1,
    code: 'accountingAndFinance',
    name: 'Accounting and Finance'
  }, {
    id: 2,
    code: 'agricultureAndForestry',
    name: 'Agriculture &amp; Forestry'
  }, {
    id: 3,
    code: 'anatomyAndPhysiology',
    name: 'Anatomy &amp; Physiology'
  }, {
    id: 4,
    code: 'anthropology',
    name: 'Anthropology'
  }, {
    id: 5,
    code: 'architectureAndBuildEnvironment',
    name: 'Architecture &amp; The built environment'
  }, {
    id: 6,
    code: 'astronomy',
    name: 'Astronomy'
  }, {
    id: 7,
    code: 'biologicalScience',
    name: 'Biological science'
  }, {
    id: 8,
    code: 'businessAndManagement',
    name: 'Business &amp; Management'
  }, {
    id: 9,
    code: 'chemistry',
    name: 'Chemistry'
  }, {
    id: 10,
    code: 'classicAndAncientHistory',
    name: 'Classics &amp; Ancient History'
  }, {
    id: 11,
    code: 'communicationAndMediaStudies',
    name: 'Communication and Media studies'
  }, {
    id: 12,
    code: 'computerScienceAndInformationSystems',
    name: 'Computer Science and Information Systems'
  }, {
    id: 13,
    code: 'creativeArts',
    name: 'Creative Arts'
  }, {
    id: 14,
    code: 'dentistry',
    name: 'Dentistry'
  }, {
    id: 15,
    code: 'developmentStudies',
    name: 'Development Studies'
  }, {
    id: 16,
    code: 'earthAndMarineScience',
    name: 'Earth &amp; Marine Science'
  }, {
    id: 17,
    code: 'economics',
    name: 'Economics'
  }, {
    id: 18,
    code: 'educationAndTraining',
    name: 'Education &amp; Training'
  }, {
    id: 19,
    code: 'engineeringAeronautical',
    name: 'Engineering- Aeronautical'
  }, {
    id: 20,
    code: 'engineeringCivilAndStructural',
    name: 'Engineering- Civil &amp; Structural'
  }, {
    id: 21,
    code: 'engineeringComputerAndNetwork',
    name: 'Engineering- Computer &amp; Network'
  }, {
    id: 22,
    code: 'engineeringElectrical',
    name: 'Engineering- Electrical'
  }, {
    id: 23,
    code: 'engineeringMineralAndMining',
    name: 'Engineering- Mineral &amp; Mining'
  }, {
    id: 24,
    code: 'engineeringChemical',
    name: 'Engineering- Chemical'
  }, {
    id: 25,
    code: 'engineeringMechanical',
    name: 'Engineering- Mechanical'
  }, {
    id: 26,
    code: 'englishLanguageAndLiterature',
    name: 'English Language &amp; Literature'
  }, {
    id: 27,
    code: 'ethnicityGenderAndDiversity',
    name: 'Ethnicity, Gender &amp; Diversity'
  }, {
    id: 28,
    code: 'finance',
    name: 'Finance'
  }, {
    id: 29,
    code: 'geography',
    name: 'Geography'
  }, {
    id: 30,
    code: 'hospitalityAndLeisureManagement',
    name: 'Hospitality &amp; Leisure Management'
  }, {
    id: 31,
    code: 'humanResourceManagement',
    name: 'Human Resource Management'
  }, {
    id: 32,
    code: 'internationalRelations',
    name: 'International Relations'
  }, {
    id: 33,
    code: 'journalism',
    name: 'Journalism'
  }, {
    id: 34,
    code: 'lawAndLegalStudies',
    name: 'Law and Legal Studies'
  }, {
    id: 35,
    code: 'libraryAndInformationManagement',
    name: 'Library &amp; Information Management'
  }, {
    id: 36,
    code: 'lifeSciences',
    name: 'Life Sciences'
  }, {
    id: 37,
    code: 'linguistics',
    name: 'Linguistics'
  }, {
    id: 38,
    code: 'logicsticsAndSupplyChainManagement',
    name: 'Logistics &amp; Supply Chain Management'
  }, {
    id: 39,
    code: 'marketing',
    name: 'Marketing'
  }, {
    id: 40,
    code: 'materialScience',
    name: 'Material Science'
  }, {
    id: 41,
    code: 'mathematics',
    name: 'Mathematics'
  }, {
    id: 42,
    code: 'medicine',
    name: 'Medicine'
  }, {
    id: 43,
    code: 'modernLanguage',
    name: 'Modern Language'
  }, {
    id: 44,
    code: 'nursing',
    name: 'Nursing'
  }, {
    id: 45,
    code: 'optometry',
    name: 'Optometry'
  }, {
    id: 46,
    code: 'performingArts',
    name: 'Performing Arts'
  }, {
    id: 47,
    code: 'pharmacology',
    name: 'Pharmacology'
  }, {
    id: 48,
    code: 'pharmacy',
    name: 'Pharmacy'
  }, {
    id: 49,
    code: 'philosophy',
    name: 'Philosophy'
  }, {
    id: 50,
    code: 'productdesign',
    name: 'Product Design'
  }, {
    id: 51,
    code: 'psychology',
    name: 'Psychology'
  }, {
    id: 52,
    code: 'publicpolicy',
    name: 'Public Policy'
  }, {
    id: 53,
    code: 'socialAndPoliticalScience',
    name: 'Social &amp; Political science'
  }, {
    id: 54,
    code: 'socialwork',
    name: 'Social Work'
  }, {
    id: 55,
    code: 'sociology',
    name: 'Sociology'
  }, {
    id: 56,
    code: 'sports',
    name: 'Sports'
  }, {
    id: 57,
    code: 'sportScience',
    name: 'Sports Science'
  }, {
    id: 58,
    code: 'statisticsAndOperations',
    name: 'Statistics and Operations'
  }, {
    id: 59,
    code: 'theologyDivinityAndReligiousStudies',
    name: 'Theology, Divinity and Religious Studies'
  }, {
    id: 60,
    code: 'urbanPlanning',
    name: 'Urban Planning'
  }, {
    id: 61,
    code: 'veterinaryScience',
    name: 'Veterinary Science'
  }, {
    id: 62,
    code: 'zoology',
    name: 'Zoology'
  }, {
    id: 63,
    code: 'others',
    name: 'Others'
  }]);
})
.then(() => {
  return db.models.userPrivacy.bulkCreate([{
    code: 'everyone',
    name: 'Everyone',
    description: 'All user can view your profile'
  }, {
    code: 'peopleifollow',
    name: 'People I Follow',
    description: 'All user can view your profile'
  }, {
    code: 'myfollowers',
    name: 'My Followers',
    description: 'All user can view your profile'
  }]);
})
.then(() => {
  let interestCategory = [{
    id: 1,
    name: 'Technology',
    cloudinaryPublicId: 'aerospace'
  }, {
    id: 2,
    name: 'Science',
    cloudinaryPublicId: 'science'
  }, {
    id: 3,
    name: 'Law',
    cloudinaryPublicId: 'law'
  }, {
    id: 4,
    name: 'Business',
    cloudinaryPublicId: 'business'
  }, {
    id: 5,
    name: 'Fitness & Health',
    cloudinaryPublicId: 'fitnessAndHealth'
  }, {
    id: 6,
    name: 'Education',
    cloudinaryPublicId: 'education'
  }, {
    id: 7,
    name: 'Economics',
    cloudinaryPublicId: 'economics'
  }, {
    id: 9,
    name: 'Sports',
    cloudinaryPublicId: 'sports'
  }, {
    id: 10,
    name: 'Photography',
    cloudinaryPublicId: 'photography'
  }, {
    id: 11,
    name: 'Accounting',
    cloudinaryPublicId: 'accounting'
  }, {
    id: 13,
    name: 'Computer Programming',
    cloudinaryPublicId: 'computerProgramming'
  }, {
    id: 14,
    name: 'Marketing',
    cloudinaryPublicId: 'marketing'
  }, {
    id: 15,
    name: 'Finance',
    cloudinaryPublicId: 'finance'
  }, {
    id: 16,
    name: 'Fashion & Style',
    cloudinaryPublicId: 'fashionAndStyle'
  }, {
    id: 19,
    name: 'Current Affairs\r\nTelevision Service',
    cloudinaryPublicId: 'currentAffairsAndTelevisionService'
  }, {
    id: 21,
    name: 'Entertainment',
    cloudinaryPublicId: 'entertainment'
  }, {
    id: 25,
    name: 'TV SERIES',
    cloudinaryPublicId: 'tvSeries'
  }, {
    id: 26,
    name: 'Beauty',
    cloudinaryPublicId: 'beauty'
  }, {
    id: 27,
    name: 'NHL',
    cloudinaryPublicId: 'nhl'
  }, {
    id: 28,
    name: 'NBA',
    cloudinaryPublicId: 'nba'
  }, {
    id: 29,
    name: 'CELEBRITY',
    cloudinaryPublicId: 'celebrity'
  }, {
    id: 30,
    name: 'TECHNOLOGY PRODUCTS',
    cloudinaryPublicId: 'technologyProducts'
  }, {
    id: 31,
    name: 'ENGLISH PREMIER LEAGUE',
    cloudinaryPublicId: 'englishPremierLeague'
  }, {
    id: 33,
    name: 'NFL',
    cloudinaryPublicId: 'nfl'
  }, {
    id: 34,
    name: 'TECHNOLOGY BRANDS',
    cloudinaryPublicId: 'technologyBrands'
  }, {
    id: 35,
    name: 'AEROSPACE',
    cloudinaryPublicId: 'aerospace'
  }, {
    id: 36,
    name: 'RELIGION',
    cloudinaryPublicId: 'religion'
  }, {
    id: 37,
    name: 'TRAVEL & HOLIDAY',
    cloudinaryPublicId: 'travelAndHoliday'
  }, {
    id: 38,
    name: 'SPANISH LA LIGA',
    cloudinaryPublicId: 'spanishLaLiga'
  }, {
    id: 39,
    name: 'BOOK AUTHORS',
    cloudinaryPublicId: 'bookAuthors'
  }, {
    id: 40,
    name: 'FAMILY & LIFE'
  }, {
    id: 41,
    name: 'Food',
    cloudinaryPublicId: 'food'
  }, {
    id: 42,
    name: 'Gaming',
    cloudinaryPublicId: 'gaming'
  }, {
    id: 43,
    name: 'Books',
    cloudinaryPublicId: 'books'
  }, {
    id: 45,
    name: 'MBL',
    cloudinaryPublicId: 'mlb'
  }];

  return db.models.interestCategory.bulkCreate(interestCategory);
})
.then(() => {
  let interest = [{// the sub-interest in the front-end
    interestCategoryId: 1,
    name: 'Artificial intelligence'
  }, {
    interestCategoryId: 1,
    name: 'Algorithms'
  }, {
    interestCategoryId: 1,
    name: 'Computer Science'
  }, {
    interestCategoryId: 1,
    name: 'Security'
  }, {
    interestCategoryId: 1,
    name: 'Wearable Tech'
  },  {
    interestCategoryId: 1,
    name: 'Electronics'
  }, {
    interestCategoryId: 1,
    name: 'Information Technology'
  }, {
    interestCategoryId: 1,
    name: 'Web development'
  }, {
    interestCategoryId: 2,
    name: 'Biology'
  }, {
    interestCategoryId: 2,
    name: 'Chemistry'
  }, {
    interestCategoryId: 2,
    name: 'Physics'
  }, {
    interestCategoryId: 2,
    name: 'Computer Science'
  }, {
    interestCategoryId: 2,
    name: 'Archaeology'
  }, {
    interestCategoryId: 2,
    name: 'Zoology'
  }, {
    interestCategoryId: 2,
    name: 'Pharmaceutical'
  }, {
    interestCategoryId: 2,
    name: 'Meta- physics'
  }, {
    interestCategoryId: 2,
    name: 'Nature'
  }, {
    interestCategoryId: 3,
    name: 'International Law'
  }, {
    interestCategoryId: 3,
    name: 'IP & Patents'
  }, {
    interestCategoryId: 3,
    name: 'Vic Law'
  }, {
    interestCategoryId: 3,
    name: 'US Law'
  }, {
    interestCategoryId: 3,
    name: 'Canadian Law'
  }, {
    interestCategoryId: 3,
    name: 'Contracts'
  }, {
    interestCategoryId: 3,
    name: 'Corporate Law'
  }, {
    interestCategoryId: 3,
    name: 'Cyber Law'
  }, {
    interestCategoryId: 3,
    name: 'Top Law Firms'
  }, {
    interestCategoryId: 4,
    name: 'Stock Market'
  }, {
    interestCategoryId: 4,
    name: 'Interest Rates'
  }, {
    interestCategoryId: 4,
    name: 'E-commerce'
  }, {
    interestCategoryId: 4,
    name: 'Business Strategy'
  }, {
    interestCategoryId: 4,
    name: 'Knowledge Management'
  }, {
    interestCategoryId: 4,
    name: 'Social Media Marketing'
  }, {
    interestCategoryId: 4,
    name: 'Start Ups-\r\nLean startups'
  }, {
    interestCategoryId: 4,
    name: 'Internet Advertising'
  }, {
    interestCategoryId: 4,
    name: 'Investing'
  }, {
    interestCategoryId: 4,
    name: 'Borrowing'
  }, {
    interestCategoryId: 4,
    name: 'E-commerce'
  }, {
    interestCategoryId: 5,
    name: 'Dieting'
  }, {
    interestCategoryId: 5,
    name: 'Healthy Recipes'
  }, {
    interestCategoryId: 5,
    name: 'Yoga'
  }, {
    interestCategoryId: 5,
    name: 'Healthy Eating'
  }, {
    interestCategoryId: 5,
    name: 'Cross Fitness'
  }, {
    interestCategoryId: 5,
    name: 'Calories'
  }, {
    interestCategoryId: 5,
    name: 'Eating Disorder'
  }, {
    interestCategoryId: 5,
    name: 'Exercise'
  }, {
    interestCategoryId: 5,
    name: 'Obesity'
  }, {
    interestCategoryId: 5,
    name: 'Low Carb diet'
  }, {
    interestCategoryId: 5,
    name: 'Transfat'
  }, {
    interestCategoryId: 6,
    name: 'Information Technology'
  }, {
    interestCategoryId: 6,
    name: 'Intelligence Quotient'
  }, {
    interestCategoryId: 6,
    name: 'Theology'
  }, {
    interestCategoryId: 7,
    name: 'GDP'
  }, {
    interestCategoryId: 7,
    name: 'Inflation'
  }, {
    interestCategoryId: 7,
    name: 'Interest Rates'
  }, {
    interestCategoryId: 7,
    name: 'Economy Blogs'
  }, {
    interestCategoryId: 7,
    name: 'Currencies'
  }, {
    interestCategoryId: 7,
    name: 'Price:\r\nOil Prices'
  }, {
    interestCategoryId: 9,
    name: 'Barclays Premier League'
  }, {
    interestCategoryId: 9,
    name: 'Champions League'
  }, {
    interestCategoryId: 9,
    name: 'NFL'
  }, {
    interestCategoryId: 9,
    name: 'NBA'
  }, {
    interestCategoryId: 9,
    name: 'ICC'
  }, {
    interestCategoryId: 9,
    name: 'Tennis'
  }, {
    interestCategoryId: 9,
    name: 'Boxing'
  }, {
    interestCategoryId: 9,
    name: 'MMA'
  }, {
    interestCategoryId: 9,
    name: 'Nascar'
  }, {
    interestCategoryId: 9,
    name: 'Ice Hockey'
  }, {
    interestCategoryId: 9,
    name: 'MLB'
  }, {
    interestCategoryId: 9,
    name: 'Snow Barbing'
  }, {
    interestCategoryId: 9,
    name: 'F 1'
  }, {
    interestCategoryId: 10,
    name: 'Motors'
  }, {
    interestCategoryId: 10,
    name: 'Architecture'
  }, {
    interestCategoryId: 10,
    name: 'Home Doctor'
  }, {
    interestCategoryId: 10,
    name: 'Interior Designs'
  }, {
    interestCategoryId: 10,
    name: 'Designs'
  }, {
    interestCategoryId: 11,
    name: 'Accountancy'
  }, {
    interestCategoryId: 11,
    name: 'ACCA'
  }, {
    interestCategoryId: 11,
    name: 'Big Four'
  }, {
    interestCategoryId: 11,
    name: 'COMA'
  }, {
    interestCategoryId: 11,
    name: 'COMA'
  }, {
    interestCategoryId: 13,
    name: 'C'
  }, {
    interestCategoryId: 13,
    name: 'C++'
  }, {
    interestCategoryId: 13,
    name: 'Node JS'
  }, {
    interestCategoryId: 13,
    name: 'Php'
  }, {
    interestCategoryId: 13,
    name: 'Java'
  }, {
    interestCategoryId: 13,
    name: 'Java Script'
  }, {
    interestCategoryId: 13,
    name: 'Phython'
  }, {
    interestCategoryId: 13,
    name: 'K'
  }, {
    interestCategoryId: 13,
    name: 'C#'
  }, {
    interestCategoryId: 13,
    name: 'Scala'
  }, {
    interestCategoryId: 13,
    name: 'Django'
  }, {
    interestCategoryId: 14,
    name: 'Media & Advertising'
  }, {
    interestCategoryId: 14,
    name: 'Social Media Marketing'
  }, {
    interestCategoryId: 14,
    name: 'S E O'
  }, {
    interestCategoryId: 14,
    name: 'Athlete Marketing'
  }, {
    interestCategoryId: 14,
    name: 'Tele Marketing'
  }, {
    interestCategoryId: 14,
    name: 'Mobile Marketing'
  }, {
    interestCategoryId: 14,
    name: 'Professional Course'
  }, {
    interestCategoryId: 15,
    name: 'Investment Banking'
  }, {
    interestCategoryId: 15,
    name: 'Flotation/IPOâ€™S'
  }, {
    interestCategoryId: 15,
    name: 'Mergers & Acquisition Private Equity'
  }, {
    interestCategoryId: 15,
    name: 'Venture Capital'
  }, {
    interestCategoryId: 15,
    name: 'Bonds'
  }, {
    interestCategoryId: 15,
    name: 'Stock Markets'
  }, {
    interestCategoryId: 15,
    name: 'Hedge Funds'
  }, {
    interestCategoryId: 15,
    name: 'Banking'
  }, {
    interestCategoryId: 15,
    name: 'Personal Finance'
  }, {
    interestCategoryId: 15,
    name: 'Currencies'
  }, {
    interestCategoryId: 16,
    name: 'Hair'
  }, {
    interestCategoryId: 16,
    name: 'Make Up'
  }, {
    interestCategoryId: 16,
    name: 'Clothing & Apparel'
  }, {
    interestCategoryId: 16,
    name: 'Fashion Weeks'
  }, {
    interestCategoryId: 16,
    name: 'Womenâ€™s fashion'
  }, {
    interestCategoryId: 16,
    name: 'Suits'
  }, {
    interestCategoryId: 19,
    name: 'Environment'
  }, {
    interestCategoryId: 19,
    name: 'Natural Disasters'
  }, {
    interestCategoryId: 19,
    name: 'War & Terrorism'
  }, {
    interestCategoryId: 19,
    name: 'Severe Weather Events'
  }, {
    interestCategoryId: 21,
    name: 'Comedy'
  }, {
    interestCategoryId: 21,
    name: 'Celebrity'
  }, {
    interestCategoryId: 21,
    name: 'X Factor'
  }, {
    interestCategoryId: 21,
    name: 'Series'
  }, {
    interestCategoryId: 21,
    name: 'Britain got talent'
  }, {
    interestCategoryId: 21,
    name: 'Gambling'
  }, {
    interestCategoryId: 21,
    name: 'Gaming'
  }, {
    interestCategoryId: 21,
    name: 'Reality Television'
  }, {
    interestCategoryId: 25,
    name: 'Games of Throne'
  }, {
    interestCategoryId: 25,
    name: 'The Saturday Night live'
  }, {
    interestCategoryId: 25,
    name: 'House of Cards'
  }, {
    interestCategoryId: 25,
    name: 'Orange is the New'
  }, {
    interestCategoryId: 25,
    name: 'Black Power'
  }, {
    interestCategoryId: 25,
    name: 'Black Suits'
  }, {
    interestCategoryId: 25,
    name: 'The Simpsons'
  }, {
    interestCategoryId: 25,
    name: 'Friends'
  }, {
    interestCategoryId: 25,
    name: 'Homeland'
  }, {
    interestCategoryId: 25,
    name: 'Prison Break'
  }, {
    interestCategoryId: 25,
    name: 'Two and a half men'
  }, {
    interestCategoryId: 25,
    name: 'Greys Anatomy'
  }, {
    interestCategoryId: 25,
    name: 'Tyrant'
  }, {
    interestCategoryId: 25,
    name: 'Veep'
  }, {
    interestCategoryId: 25,
    name: 'The Walking Dead'
  }, {
    interestCategoryId: 25,
    name: 'Dr Who'
  }, {
    interestCategoryId: 25,
    name: 'Netflix Series'
  }, {
    interestCategoryId: 26,
    name: 'Menâ€™s fashion'
  }, {
    interestCategoryId: 26,
    name: 'Make up'
  }, {
    interestCategoryId: 26,
    name: 'Womenâ€™s fashion'
  }, {
    interestCategoryId: 26,
    name: 'Women apparel'
  }, {
    interestCategoryId: 26,
    name: 'Menâ€™s apparel'
  }, {
    interestCategoryId: 26,
    name: 'Menâ€™s Suit'
  }, {
    interestCategoryId: 26,
    name: 'Womenâ€™s Hairstyles'
  }, {
    interestCategoryId: 26,
    name: 'Menâ€™s Hairstyles'
  }, {
    interestCategoryId: 26,
    name: 'Hair extensions'
  }, {
    interestCategoryId: 27,
    name: 'Anaheim Ducks'
  }, {
    interestCategoryId: 27,
    name: 'Arizona Coyotes'
  }, {
    interestCategoryId: 27,
    name: 'Boston Bruins'
  }, {
    interestCategoryId: 27,
    name: 'Buffalo Sabres'
  }, {
    interestCategoryId: 27,
    name: 'Calgary Flames'
  }, {
    interestCategoryId: 27,
    name: 'Carolina Hurricanes'
  }, {
    interestCategoryId: 27,
    name: 'Chicago Blackhawks'
  }, {
    interestCategoryId: 27,
    name: 'Colorado Avalanche'
  }, {
    interestCategoryId: 27,
    name: 'Columbus Blue Jackets'
  }, {
    interestCategoryId: 27,
    name: 'Dallas Stars'
  }, {
    interestCategoryId: 27,
    name: 'Detroit Red Wings'
  }, {
    interestCategoryId: 27,
    name: 'Los Angeles Kings'
  }, {
    interestCategoryId: 27,
    name: 'Minnesota Wilds'
  }, {
    interestCategoryId: 27,
    name: 'Edmonton Oilers'
  }, {
    interestCategoryId: 27,
    name: 'Montreal Canadiens'
  }, {
    interestCategoryId: 27,
    name: 'Florida Panthers'
  }, {
    interestCategoryId: 27,
    name: 'Nashville Predators'
  }, {
    interestCategoryId: 27,
    name: 'New Jersey Devils'
  }, {
    interestCategoryId: 27,
    name: 'New York Islanders'
  }, {
    interestCategoryId: 27,
    name: 'New York Rangers'
  }, {
    interestCategoryId: 27,
    name: 'Ottawa Senators'
  }, {
    interestCategoryId: 27,
    name: 'Philadelphia Flyers'
  }, {
    interestCategoryId: 27,
    name: 'Pittsburgh Penguins'
  }, {
    interestCategoryId: 27,
    name: 'San Jose Sharks'
  }, {
    interestCategoryId: 27,
    name: 'St. Louis Blues'
  }, {
    interestCategoryId: 27,
    name: 'Tampa Bay Lightning'
  }, {
    interestCategoryId: 27,
    name: 'Toronto Maple Leafs'
  }, {
    interestCategoryId: 27,
    name: 'Vancouver Canucks'
  }, {
    interestCategoryId: 27,
    name: 'Washington Capitals'
  }, {
    interestCategoryId: 27,
    name: 'Winnipeg Jets'
  }, {
    interestCategoryId: 28,
    name: 'Atlanta Hawks'
  }, {
    interestCategoryId: 28,
    name: 'Boston Celtics'
  }, {
    interestCategoryId: 28,
    name: 'Brooklyn Nets'
  }, {
    interestCategoryId: 28,
    name: 'Charlotte Hornets'
  }, {
    interestCategoryId: 28,
    name: 'Chicago Bulls'
  }, {
    interestCategoryId: 28,
    name: 'Cleveland Cavaliers'
  }, {
    interestCategoryId: 28,
    name: 'Dallas Mavericks'
  }, {
    interestCategoryId: 28,
    name: 'Denver Nuggets'
  }, {
    interestCategoryId: 28,
    name: 'Detroit Pistons'
  }, {
    interestCategoryId: 28,
    name: 'Golden State Warriors'
  }, {
    interestCategoryId: 28,
    name: 'Houston Rockets'
  }, {
    interestCategoryId: 28,
    name: 'New Orleans Pelicans'
  }, {
    interestCategoryId: 28,
    name: 'New York Knicks'
  }, {
    interestCategoryId: 28,
    name: 'Indiana Pacers'
  }, {
    interestCategoryId: 28,
    name: 'LA Clippers'
  }, {
    interestCategoryId: 28,
    name: 'Los Angeles Lakers'
  }, {
    interestCategoryId: 28,
    name: 'Memphis Grizzlies'
  }, {
    interestCategoryId: 28,
    name: 'Miami Heat'
  }, {
    interestCategoryId: 28,
    name: 'Oklahoma City Thunder'
  }, {
    interestCategoryId: 28,
    name: 'Milwaukee Bucks'
  }, {
    interestCategoryId: 28,
    name: 'Orlando Magic'
  }, {
    interestCategoryId: 28,
    name: 'Philadelphia 76ers'
  }, {
    interestCategoryId: 28,
    name: 'Phoenix Suns'
  }, {
    interestCategoryId: 28,
    name: 'Portland Trail Blazers'
  }, {
    interestCategoryId: 28,
    name: 'Sacramento Kings'
  }, {
    interestCategoryId: 28,
    name: 'San Antonio Spurs'
  }, {
    interestCategoryId: 28,
    name: 'Toronto Raptors'
  }, {
    interestCategoryId: 28,
    name: 'Utah Jazz'
  }, {
    interestCategoryId: 28,
    name: 'Minnesota Timberwolves'
  }, {
    interestCategoryId: 28,
    name: 'Washington Wizards'
  }, {
    interestCategoryId: 29,
    name: 'Celebrity Gossip'
  }, {
    interestCategoryId: 29,
    name: 'Ciara'
  }, {
    interestCategoryId: 29,
    name: 'BeyoncÃ©'
  }, {
    interestCategoryId: 29,
    name: 'Rihanna'
  }, {
    interestCategoryId: 29,
    name: 'Katy Perry'
  }, {
    interestCategoryId: 29,
    name: 'Drake'
  }, {
    interestCategoryId: 29,
    name: 'Jay-Y'
  }, {
    interestCategoryId: 29,
    name: 'The Weekend'
  }, {
    interestCategoryId: 29,
    name: 'Future'
  }, {
    interestCategoryId: 29,
    name: 'Kylie Jenner'
  }, {
    interestCategoryId: 29,
    name: 'Kanye West'
  }, {
    interestCategoryId: 29,
    name: 'Kim Kardashian'
  }, {
    interestCategoryId: 29,
    name: 'Lebron James'
  }, {
    interestCategoryId: 29,
    name: 'Cristiano Ronaldo'
  }, {
    interestCategoryId: 29,
    name: 'Roger Federer'
  }, {
    interestCategoryId: 29,
    name: 'Lionel Messi'
  }, {
    interestCategoryId: 29,
    name: 'Nicki Minaj'
  }, {
    interestCategoryId: 29,
    name: 'Barack Obama'
  }, {
    interestCategoryId: 29,
    name: 'Justin Bieber'
  }, {
    interestCategoryId: 29,
    name: 'Selena Gomez'
  }, {
    interestCategoryId: 29,
    name: 'Jenifer Lopez'
  }, {
    interestCategoryId: 29,
    name: 'Taylor Swift'
  }, {
    interestCategoryId: 29,
    name: 'Stephen Curry'
  }, {
    interestCategoryId: 29,
    name: 'Kevin Durant'
  }, {
    interestCategoryId: 29,
    name: 'Michael Jordan'
  }, {
    interestCategoryId: 29,
    name: '2pac'
  }, {
    interestCategoryId: 30,
    name: 'Artificial intelligence'
  }, {
    interestCategoryId: 30,
    name: 'Wearable Tech'
  }, {
    interestCategoryId: 30,
    name: 'Apple watch'
  }, {
    interestCategoryId: 30,
    name: 'Iphones'
  }, {
    interestCategoryId: 30,
    name: 'Driverless Cars'
  }, {
    interestCategoryId: 31,
    name: 'Arsenal'
  }, {
    interestCategoryId: 31,
    name: 'Chelsea'
  }, {
    interestCategoryId: 31,
    name: 'Manchester United'
  }, {
    interestCategoryId: 31,
    name: 'Liverpool'
  }, {
    interestCategoryId: 31,
    name: 'Manchester City'
  }, {
    interestCategoryId: 31,
    name: 'Everton'
  }, {
    interestCategoryId: 31,
    name: 'Totenham Hotspurs'
  }, {
    interestCategoryId: 31,
    name: 'Westham'
  }, {
    interestCategoryId: 31,
    name: 'Southampton'
  }, {
    interestCategoryId: 33,
    name: 'Arizona Cardinals'
  }, {
    interestCategoryId: 33,
    name: 'Atlanta Falcons'
  }, {
    interestCategoryId: 33,
    name: 'Baltimore Ravens'
  }, {
    interestCategoryId: 33,
    name: 'Buffalo Bills'
  }, {
    interestCategoryId: 33,
    name: 'Carolina Panthers'
  }, {
    interestCategoryId: 33,
    name: 'Chicago Bears'
  }, {
    interestCategoryId: 33,
    name: 'Cincinnati Bengals'
  }, {
    interestCategoryId: 33,
    name: 'Cleveland Browns'
  }, {
    interestCategoryId: 33,
    name: 'Dallas Cowboy'
  }, {
    interestCategoryId: 33,
    name: 'Denver Broncos'
  }, {
    interestCategoryId: 33,
    name: 'Detroit Lions'
  }, {
    interestCategoryId: 33,
    name: 'Minnesota Vikings'
  }, {
    interestCategoryId: 33,
    name: 'Green Bay Packers'
  }, {
    interestCategoryId: 33,
    name: 'Houston Texans'
  }, {
    interestCategoryId: 33,
    name: 'Indianapolis Colts'
  }, {
    interestCategoryId: 33,
    name: 'Jacksonville Jaguars'
  }, {
    interestCategoryId: 33,
    name: 'Kansas City Chiefs'
  }, {
    interestCategoryId: 33,
    name: 'Los Angeles Rams'
  }, {
    interestCategoryId: 33,
    name: 'Los Angeles Chargers'
  }, {
    interestCategoryId: 33,
    name: 'Miami Dolphin'
  }, {
    interestCategoryId: 33,
    name: 'New England Patriots'
  }, {
    interestCategoryId: 33,
    name: 'New Orleans Saints'
  }, {
    interestCategoryId: 33,
    name: 'New York Giants'
  }, {
    interestCategoryId: 33,
    name: 'New York Jets'
  }, {
    interestCategoryId: 33,
    name: 'Oakland Raiders'
  }, {
    interestCategoryId: 33,
    name: 'Philadelphia Eagles'
  }, {
    interestCategoryId: 33,
    name: 'Pittsburgh Steelers'
  }, {
    interestCategoryId: 33,
    name: 'San Francisco 49ers'
  }, {
    interestCategoryId: 33,
    name: 'Seattle Seahawks'
  }, {
    interestCategoryId: 33,
    name: 'Tampa Bay Buccaneers'
  }, {
    interestCategoryId: 33,
    name: 'Tennessee Titans'
  }, {
    interestCategoryId: 33,
    name: 'Washington Redskins'
  }, {
    interestCategoryId: 34,
    name: 'Apple'
  }, {
    interestCategoryId: 34,
    name: 'Samsung'
  }, {
    interestCategoryId: 34,
    name: 'Microsoft'
  }, {
    interestCategoryId: 34,
    name: 'Google'
  }, {
    interestCategoryId: 34,
    name: 'Sony'
  }, {
    interestCategoryId: 34,
    name: 'LG'
  }, {
    interestCategoryId: 34,
    name: 'Panasonic'
  }, {
    interestCategoryId: 34,
    name: 'Uber'
  }, {
    interestCategoryId: 34,
    name: 'Facebook'
  }, {
    interestCategoryId: 34,
    name: 'Amazon'
  }, {
    interestCategoryId: 34,
    name: 'Acer'
  }, {
    interestCategoryId: 34,
    name: 'HP'
  }, {
    interestCategoryId: 34,
    name: 'IBM'
  }, {
    interestCategoryId: 34,
    name: 'Yahoo'
  }, {
    interestCategoryId: 34,
    name: 'DELL'
  }, {
    interestCategoryId: 34,
    name: 'Lenovo'
  }, {
    interestCategoryId: 34,
    name: 'Blackberry'
  }, {
    interestCategoryId: 34,
    name: 'Adobe'
  }, {
    interestCategoryId: 34,
    name: 'Intell'
  }, {
    interestCategoryId: 34,
    name: 'Toshiba'
  }, {
    interestCategoryId: 34,
    name: 'Bitcoin'
  }, {
    interestCategoryId: 34,
    name: 'Netflix'
  }, {
    interestCategoryId: 34,
    name: 'AirBnB'
  }, {
    interestCategoryId: 35,
    name: 'Airlines'
  }, {
    interestCategoryId: 35,
    name: 'Boeing'
  }, {
    interestCategoryId: 35,
    name: 'Aerospace Engineering'
  }, {
    interestCategoryId: 36,
    name: 'Christianity'
  }, {
    interestCategoryId: 36,
    name: 'Islamism'
  }, {
    interestCategoryId: 36,
    name: 'Hinduism'
  }, {
    interestCategoryId: 36,
    name: 'Theology'
  }, {
    interestCategoryId: 36,
    name: 'Atheist'
  }, {
    interestCategoryId: 36,
    name: 'Buddhism'
  }, {
    interestCategoryId: 36,
    name: 'Scientology'
  }, {
    interestCategoryId: 36,
    name: 'Sikhism'
  }, {
    interestCategoryId: 37,
    name: 'Cruise Holiday'
  }, {
    interestCategoryId: 37,
    name: 'Travel'
  }, {
    interestCategoryId: 38,
    name: 'Barcelona'
  }, {
    interestCategoryId: 38,
    name: 'Real Madrid'
  }, {
    interestCategoryId: 38,
    name: 'Atletico Madrid'
  }, {
    interestCategoryId: 38,
    name: 'Valencia'
  }, {
    interestCategoryId: 38,
    name: 'Seville'
  }, {
    interestCategoryId: 39,
    name: 'Stephen King'
  }, {
    interestCategoryId: 39,
    name: 'J. K. Rowling'
  }, {
    interestCategoryId: 39,
    name: 'Dan Brown'
  }, {
    interestCategoryId: 39,
    name: 'David Baldacci'
  }, {
    interestCategoryId: 39,
    name: 'John Grisham'
  }, {
    interestCategoryId: 40,
    name: 'Marriage'
  }, {
    interestCategoryId: 40,
    name: 'Social work'
  }, {
    interestCategoryId: 40,
    name: 'Sex'
  }, {
    interestCategoryId: 40,
    name: 'LGBT'
  }, {
    interestCategoryId: 40,
    name: 'Weddings'
  }, {
    interestCategoryId: 40,
    name: 'Relationships'
  }, {
    interestCategoryId: 40,
    name: 'Kids and Parenting'
  }, {
    interestCategoryId: 41,
    name: 'Dieting'
  }, {
    interestCategoryId: 41,
    name: 'Chinese Cuisine'
  }, {
    interestCategoryId: 41,
    name: 'African Cuisine'
  }, {
    interestCategoryId: 41,
    name: 'Nutrition'
  }, {
    interestCategoryId: 41,
    name: 'Healthy Recipes'
  }, {
    interestCategoryId: 41,
    name: 'Low carb diets'
  }, {
    interestCategoryId: 41,
    name: 'Recipes'
  }, {
    interestCategoryId: 41,
    name: 'Grilling Recipes'
  }, {
    interestCategoryId: 41,
    name: 'Desserts'
  }, {
    interestCategoryId: 41,
    name: 'Healthy diets'
  }, {
    interestCategoryId: 42,
    name: 'Microsoft Xbox 360'
  }, {
    interestCategoryId: 42,
    name: 'Bingo'
  }, {
    interestCategoryId: 42,
    name: 'PC Games'
  }, {
    interestCategoryId: 42,
    name: 'FIFA'
  }, {
    interestCategoryId: 42,
    name: 'Pro Evolution Soccer'
  }, {
    interestCategoryId: 42,
    name: 'Call Of Duty'
  }, {
    interestCategoryId: 42,
    name: 'Nintendo Wii U'
  }, {
    interestCategoryId: 42,
    name: 'Sony PlayStation Ps 4'
  }, {
    interestCategoryId: 42,
    name: 'Assassin Creed'
  }, {
    interestCategoryId: 42,
    name: 'Pokemon'
  }, {
    interestCategoryId: 42,
    name: 'Halo'
  }, {
    interestCategoryId: 42,
    name: 'Batman'
  }, {
    interestCategoryId: 42,
    name: 'Far Cry'
  }, {
    interestCategoryId: 42,
    name: 'Battlefield'
  }, {
    interestCategoryId: 42,
    name: 'Bioshock'
  }, {
    interestCategoryId: 42,
    name: 'Destiny'
  }, {
    interestCategoryId: 42,
    name: 'Football Manager'
  }, {
    interestCategoryId: 42,
    name: 'Need For Speed'
  }, {
    interestCategoryId: 42,
    name: 'Dragon Age'
  }, {
    interestCategoryId: 42,
    name: 'Final Fantasy'
  }, {
    interestCategoryId: 42,
    name: 'Lego'
  }, {
    interestCategoryId: 42,
    name: 'Mario'
  }, {
    interestCategoryId: 42,
    name: 'Elder Scrolls'
  }, {
    interestCategoryId: 42,
    name: 'Tomb Raider'
  }, {
    interestCategoryId: 42,
    name: 'Meta Gear'
  }, {
    interestCategoryId: 42,
    name: 'Pokemon Go'
  }, {
    interestCategoryId: 42,
    name: 'Fallout'
  }, {
    interestCategoryId: 43,
    name: 'Science & Fiction'
  }, {
    interestCategoryId: 43,
    name: 'Biography'
  }, {
    interestCategoryId: 43,
    name: 'History'
  }, {
    interestCategoryId: 43,
    name: 'Romance'
  }, {
    interestCategoryId: 43,
    name: 'Marvel Comics'
  }, {
    interestCategoryId: 43,
    name: 'Love Quotes'
  }, {
    interestCategoryId: 43,
    name: 'Funny Quotes'
  }, {
    interestCategoryId: 45,
    name: 'Atlanta Braves'
  }, {
    interestCategoryId: 45,
    name: 'Florida Marlins'
  }, {
    interestCategoryId: 45,
    name: 'New York Mets'
  }, {
    interestCategoryId: 45,
    name: 'Philadelphia Phillies'
  }, {
    interestCategoryId: 45,
    name: 'Washington'
  }, {
    interestCategoryId: 45,
    name: 'Nationals Central'
  }, {
    interestCategoryId: 45,
    name: 'Chicago Cubs'
  }, {
    interestCategoryId: 45,
    name: 'Cincinnati Reds'
  }, {
    interestCategoryId: 45,
    name: 'Houston Astros'
  }, {
    interestCategoryId: 45,
    name: 'Milwaukee Brewers'
  }, {
    interestCategoryId: 45,
    name: 'Pittsburgh Pirates'
  }, {
    interestCategoryId: 45,
    name: 'St. Louis Cardinals West Arizona'
  }, {
    interestCategoryId: 45,
    name: 'Orioles Boston Red Sox New York'
  }, {
    interestCategoryId: 45,
    name: 'Yankees Tampa Bay`'
  }, {
    interestCategoryId: 45,
    name: 'Diamondbacks'
  }, {
    interestCategoryId: 45,
    name: 'Colorado Rockies'
  }, {
    interestCategoryId: 45,
    name: 'Los Angeles Dodgers'
  }, {
    interestCategoryId: 45,
    name: 'San Diego Padres'
  }, {
    interestCategoryId: 45,
    name: 'San Francisco Giants'
  }, {
    interestCategoryId: 45,
    name: 'American League'
  }, {
    interestCategoryId: 45,
    name: 'East Baltimore'
  }];

  return db.models.interest.bulkCreate(interest);
})
.then(() => {
  // create campus courses
  let campusCourse = [{
    id: 1,
    courseId: 1,
    campusId: 1
  }, {
    id: 2,
    courseId: 2,
    campusId: 1
  }, {
    id: 3,
    courseId: 3,
    campusId: 1
  }, {
    id: 4,
    courseId: 4,
    campusId: 1
  }];

  return db.models.campusCourse.bulkCreate(campusCourse);
})
.then(() => {
  return db.models.campusCourseClass.bulkCreate([{
    campusCourseId: 1,
    name: 'Mathematics'
  }]);
})
.then(function () {
  process.exit(0);
});