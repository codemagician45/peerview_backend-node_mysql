/*eslint-disable max-lines*/
'use strict';

const db = require(__dirname + '/lib/db');
const md5 = require('MD5');

function cleanUp () {
  return db.sync({force: true});
}

return cleanUp()
.then(() => {
  return db.models.userStudyLevel.bulkCreate([{
    name: 'Undergraduate Level'
  }, {
    name: 'Postsecondary Level'
  }, {
    name: 'PostGraduate Level'
  }]);
})
.then(() => {
  return db.models.userType.bulkCreate([{
    code: 'student',
    name: 'Student'
  }, {
    code: 'professionals',
    name: 'Ex-student'
  }, {
    code: 'organizationInstitution',
    name: 'Organization/Institution'
  }]);
})// below will be a test data for login
.then(() => {
  return db.models.campus.create({
    id: 1,
    name: 'Peersview Campus'
  });
})
.then(() => {
  return db.models.user.create({
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test.com',
    password: md5(12345678),
    campusId: 1
  });
})
.then(() => {
  return db.models.course.bulkCreate([{
    code: 'accountingAndFinance',
    name: 'Accounting and Finance'
  }, {
    code: 'agricultureAndForestry',
    name: 'Agriculture &amp; Forestry'
  }, {
    code: 'anatomyAndPhysiology',
    name: 'Anatomy &amp; Physiology'
  }, {
    code: 'anthropology',
    name: 'Anthropology'
  }, {
    code: 'architectureAndBuildEnvironment',
    name: 'Architecture &amp; The built environment'
  }, {
    code: 'astronomy',
    name: 'Astronomy'
  }, {
    code: 'biologicalScience',
    name: 'Biological science'
  }, {
    code: 'businessAndManagement',
    name: 'Business &amp; Management'
  }, {
    code: 'chemistry',
    name: 'Chemistry'
  }, {
    code: 'classicAndAncientHistory',
    name: 'Classics &amp; Ancient History'
  }, {
    code: 'communicationAndMediaStudies',
    name: 'Communication and Media studies'
  }, {
    code: 'computerScienceAndInformationSystems',
    name: 'Computer Science and Information Systems'
  }, {
    code: 'creativeArts',
    name: 'Creative Arts'
  }, {
    code: 'dentistry',
    name: 'Dentistry'
  }, {
    code: 'developmentStudies',
    name: 'Development Studies'
  }, {
    code: 'earthAndMarineScience',
    name: 'Earth &amp; Marine Science'
  }, {
    code: 'economics',
    name: 'Economics'
  }, {
    code: 'educationAndTraining',
    name: 'Education &amp; Training'
  }, {
    code: 'engineeringAeronautical',
    name: 'Engineering- Aeronautical'
  }, {
    code: 'engineeringCivilAndStructural',
    name: 'Engineering- Civil &amp; Structural'
  }, {
    code: 'engineeringComputerAndNetwork',
    name: 'Engineering- Computer &amp; Network'
  }, {
    code: 'engineeringElectrical',
    name: 'Engineering- Electrical'
  }, {
    code: 'engineeringMineralAndMining',
    name: 'Engineering- Mineral &amp; Mining'
  }, {
    code: 'engineeringChemical',
    name: 'Engineering- Chemical'
  }, {
    code: 'engineeringMechanical',
    name: 'Engineering- Mechanical'
  }, {
    code: 'englishLanguageAndLiterature',
    name: 'English Language &amp; Literature'
  }, {
    code: 'ethnicityGenderAndDiversity',
    name: 'Ethnicity, Gender &amp; Diversity'
  }, {
    code: 'finance',
    name: 'Finance'
  }, {
    code: 'geography',
    name: 'Geography'
  }, {
    code: 'hospitalityAndLeisureManagement',
    name: 'Hospitality &amp; Leisure Management'
  }, {
    code: 'humanResourceManagement',
    name: 'Human Resource Management'
  }, {
    code: 'internationalRelations',
    name: 'International Relations'
  }, {
    code: 'journalism',
    name: 'Journalism'
  }, {
    code: 'lawAndLegalStudies',
    name: 'Law and Legal Studies'
  }, {
    code: 'libraryAndInformationManagement',
    name: 'Library &amp; Information Management'
  }, {
    code: 'lifeSciences',
    name: 'Life Sciences'
  }, {
    code: 'linguistics',
    name: 'Linguistics'
  }, {
    code: 'logicsticsAndSupplyChainManagement',
    name: 'Logistics &amp; Supply Chain Management'
  }, {
    code: 'marketing',
    name: 'Marketing'
  }, {
    code: 'materialScience',
    name: 'Material Science'
  }, {
    code: 'mathematics',
    name: 'Mathematics'
  }, {
    code: 'medicine',
    name: 'Medicine'
  }, {
    code: 'modernLanguage',
    name: 'Modern Language'
  }, {
    code: 'nursing',
    name: 'Nursing'
  }, {
    code: 'optometry',
    name: 'Optometry'
  }, {
    code: 'performingArts',
    name: 'Performing Arts'
  }, {
    code: 'pharmacology',
    name: 'Pharmacology'
  }, {
    code: 'pharmacy',
    name: 'Pharmacy'
  }, {
    code: 'philosophy',
    name: 'Philosophy'
  }, {
    code: 'productdesign',
    name: 'Product Design'
  }, {
    code: 'psychology',
    name: 'Psychology'
  }, {
    code: 'publicpolicy',
    name: 'Public Policy'
  }, {
    code: 'socialAndPoliticalScience',
    name: 'Social &amp; Political science'
  }, {
    code: 'socialwork',
    name: 'Social Work'
  }, {
    code: 'sociology',
    name: 'Sociology'
  }, {
    code: 'sports',
    name: 'Sports'
  }, {
    code: 'sportScience',
    name: 'Sports Science'
  }, {
    code: 'statisticsAndOperations',
    name: 'Statistics and Operations'
  }, {
    code: 'theologyDivinityAndReligiousStudies',
    name: 'Theology, Divinity and Religious Studies'
  }, {
    code: 'urbanPlanning',
    name: 'Urban Planning'
  }, {
    code: 'veterinaryScience',
    name: 'Veterinary Science'
  }, {
    code: 'zoology',
    name: 'Zoology'
  }, {
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
  return db.models.postCategory.bulkCreate([{
    code: 'post',
    name: 'Post',
  }, {
    code: 'story',
    name: 'Story',
  }]);
})
.then(() => {
  let interestCategory = [{
    id: 1,
    name: 'Technology',
    cloudinaryPublicId: 'technology'
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
    id: 8,
    name: 'Cooking',
    cloudinaryPublicId: 'cooking'
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
    id: 12,
    name: 'History',
    cloudinaryPublicId: 'history'
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
    id: 17,
    name: 'Politics',
    cloudinaryPublicId: 'politics'
  }, {
    id: 18,
    name: 'Literature',
    cloudinaryPublicId: 'literature'
  }, {
    id: 19,
    name: 'Current Affairs\r\nTelevision Service',
    cloudinaryPublicId: 'currentAffairsAndTelevisionService'
  }, {
    id: 20,
    name: 'Journalism',
    cloudinaryPublicId: 'journalism'
  }, {
    id: 21,
    name: 'Entertainment',
    cloudinaryPublicId: 'entertainment'
  }, {
    id: 22,
    name: 'World News',
    cloudinaryPublicId: 'worldNews'
  }, {
    id: 24,
    name: 'Energy',
    cloudinaryPublicId: 'energy'
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
    id: 32,
    name: 'AUTOMOBILES',
    cloudinaryPublicId: 'automobiles'
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
    name: 'SPANISH LA LIGA'
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
    id: 44,
    name: 'Films',
    cloudinaryPublicId: 'films'
  }, {
    id: 45,
    name: 'MBL'
  }];

  return db.models.interestCategory.bulkCreate(interestCategory);
})
.then(() => {
  let interest = [{// the sub-interest in the front-end
    interestCategory: 1,
    name: 'Artificial intelligence'
  }, {
    interestCategory: 1,
    name: 'Algorithms'
  }, {
    interestCategory: 1,
    name: 'Computer Science'
  }, {
    interestCategory: 1,
    name: 'Security'
  }, {
    interestCategory: 1,
    name: 'Wearable Tech'
  },  {
    interestCategory: 1,
    name: 'Electronics'
  }, {
    interestCategory: 1,
    name: 'Information Technology'
  }, {
    interestCategory: 1,
    name: 'Web development'
  }, {
    interestCategory: 2,
    name: 'Biology'
  }, {
    interestCategory: 2,
    name: 'Chemistry'
  }, {
    interestCategory: 2,
    name: 'Physics'
  }, {
    interestCategory: 2,
    name: 'Computer Science'
  }, {
    interestCategory: 2,
    name: 'Archaeology'
  }, {
    interestCategory: 2,
    name: 'Zoology'
  }, {
    interestCategory: 2,
    name: 'Pharmaceutical'
  }, {
    interestCategory: 2,
    name: 'Meta- physics'
  }, {
    interestCategory: 2,
    name: 'Nature'
  }, {
    interestCategory: 3,
    name: 'International Law'
  }, {
    interestCategory: 3,
    name: 'IP & Patents'
  }, {
    interestCategory: 3,
    name: 'Vic Law'
  }, {
    interestCategory: 3,
    name: 'US Law'
  }, {
    interestCategory: 3,
    name: 'Canadian Law'
  }, {
    interestCategory: 3,
    name: 'Contracts'
  }, {
    interestCategory: 3,
    name: 'Corporate Law'
  }, {
    interestCategory: 3,
    name: 'Cyber Law'
  }, {
    interestCategory: 3,
    name: 'Top Law Firms'
  }, {
    interestCategory: 4,
    name: 'Stock Market'
  }, {
    interestCategory: 4,
    name: 'Interest Rates'
  }, {
    interestCategory: 4,
    name: 'E-commerce'
  }, {
    interestCategory: 4,
    name: 'Business Strategy'
  }, {
    interestCategory: 4,
    name: 'Knowledge Management'
  }, {
    interestCategory: 4,
    name: 'Social Media Marketing'
  }, {
    interestCategory: 4,
    name: 'Start Ups-\r\nLean startups'
  }, {
    interestCategory: 4,
    name: 'Internet Advertising'
  }, {
    interestCategory: 4,
    name: 'Investing'
  }, {
    interestCategory: 4,
    name: 'Borrowing'
  }, {
    interestCategory: 4,
    name: 'E-commerce'
  }, {
    interestCategory: 5,
    name: 'Dieting'
  }, {
    interestCategory: 5,
    name: 'Healthy Recipes'
  }, {
    interestCategory: 5,
    name: 'Yoga'
  }, {
    interestCategory: 5,
    name: 'Healthy Eating'
  }, {
    interestCategory: 5,
    name: 'Cross Fitness'
  }, {
    interestCategory: 5,
    name: 'Calories'
  }, {
    interestCategory: 5,
    name: 'Eating Disorder'
  }, {
    interestCategory: 5,
    name: 'Exercise'
  }, {
    interestCategory: 5,
    name: 'Obesity'
  }, {
    interestCategory: 5,
    name: 'Low Carb diet'
  }, {
    interestCategory: 5,
    name: 'Transfat'
  }, {
    interestCategory: 6,
    name: 'Information Technology'
  }, {
    interestCategory: 6,
    name: 'Intelligence Quotient'
  }, {
    interestCategory: 6,
    name: 'Theology'
  }, {
    interestCategory: 7,
    name: 'GDP'
  }, {
    interestCategory: 7,
    name: 'Inflation'
  }, {
    interestCategory: 7,
    name: 'Interest Rates'
  }, {
    interestCategory: 7,
    name: 'Economy Blogs'
  }, {
    interestCategory: 7,
    name: 'Currencies'
  }, {
    interestCategory: 7,
    name: 'Price:\r\nOil Prices'
  }, {
    interestCategory: 8,
    name: 'Recipes'
  }, {
    interestCategory: 8,
    name: 'Nutrition'
  }, {
    interestCategory: 9,
    name: 'Barclays Premier League'
  }, {
    interestCategory: 9,
    name: 'Champions League'
  }, {
    interestCategory: 9,
    name: 'NFL'
  }, {
    interestCategory: 9,
    name: 'NBA'
  }, {
    interestCategory: 9,
    name: 'ICC'
  }, {
    interestCategory: 9,
    name: 'Tennis'
  }, {
    interestCategory: 9,
    name: 'Boxing'
  }, {
    interestCategory: 9,
    name: 'MMA'
  }, {
    interestCategory: 9,
    name: 'Nascar'
  }, {
    interestCategory: 9,
    name: 'Ice Hockey'
  }, {
    interestCategory: 9,
    name: 'MLB'
  }, {
    interestCategory: 9,
    name: 'Snow Barbing'
  }, {
    interestCategory: 9,
    name: 'F 1'
  }, {
    interestCategory: 10,
    name: 'Motors'
  }, {
    interestCategory: 10,
    name: 'Architecture'
  }, {
    interestCategory: 10,
    name: 'Home Doctor'
  }, {
    interestCategory: 10,
    name: 'Interior Designs'
  }, {
    interestCategory: 10,
    name: 'Designs'
  }, {
    interestCategory: 11,
    name: 'Accountancy'
  }, {
    interestCategory: 11,
    name: 'ACCA'
  }, {
    interestCategory: 11,
    name: 'Big Four'
  }, {
    interestCategory: 11,
    name: 'COMA'
  }, {
    interestCategory: 11,
    name: 'COMA'
  }, {
    interestCategory: 12,
    name: 'Quotes'
  }, {
    interestCategory: 13,
    name: 'C'
  }, {
    interestCategory: 13,
    name: 'C++'
  }, {
    interestCategory: 13,
    name: 'Node JS'
  }, {
    interestCategory: 13,
    name: 'Php'
  }, {
    interestCategory: 13,
    name: 'Java'
  }, {
    interestCategory: 13,
    name: 'Java Script'
  }, {
    interestCategory: 13,
    name: 'Phython'
  }, {
    interestCategory: 13,
    name: 'K'
  }, {
    interestCategory: 13,
    name: 'C#'
  }, {
    interestCategory: 13,
    name: 'Scala'
  }, {
    interestCategory: 13,
    name: 'Django'
  }, {
    interestCategory: 14,
    name: 'Media & Advertising'
  }, {
    interestCategory: 14,
    name: 'Social Media Marketing'
  }, {
    interestCategory: 14,
    name: 'S E O'
  }, {
    interestCategory: 14,
    name: 'Athlete Marketing'
  }, {
    interestCategory: 14,
    name: 'Tele Marketing'
  }, {
    interestCategory: 14,
    name: 'Mobile Marketing'
  }, {
    interestCategory: 14,
    name: 'Professional Course'
  }, {
    interestCategory: 15,
    name: 'Investment Banking'
  }, {
    interestCategory: 15,
    name: 'Flotation/IPO’S'
  }, {
    interestCategory: 15,
    name: 'Mergers & Acquisition Private Equity'
  }, {
    interestCategory: 15,
    name: 'Venture Capital'
  }, {
    interestCategory: 15,
    name: 'Bonds'
  }, {
    interestCategory: 15,
    name: 'Stock Markets'
  }, {
    interestCategory: 15,
    name: 'Hedge Funds'
  }, {
    interestCategory: 15,
    name: 'Banking'
  }, {
    interestCategory: 15,
    name: 'Personal Finance'
  }, {
    interestCategory: 15,
    name: 'Currencies'
  }, {
    interestCategory: 16,
    name: 'Hair'
  }, {
    interestCategory: 16,
    name: 'Make Up'
  }, {
    interestCategory: 16,
    name: 'Clothing & Apparel'
  }, {
    interestCategory: 16,
    name: 'Fashion Weeks'
  }, {
    interestCategory: 16,
    name: 'Women’s fashion'
  }, {
    interestCategory: 16,
    name: 'Suits'
  }, {
    interestCategory: 18,
    name: 'Writing'
  }, {
    interestCategory: 18,
    name: 'Books'
  }, {
    interestCategory: 18,
    name: 'Novels'
  }, {
    interestCategory: 18,
    name: 'Comics'
  }, {
    interestCategory: 19,
    name: 'Environment'
  }, {
    interestCategory: 19,
    name: 'Natural Disasters'
  }, {
    interestCategory: 19,
    name: 'War & Terrorism'
  }, {
    interestCategory: 19,
    name: 'Severe Weather Events'
  }, {
    interestCategory: 21,
    name: 'Comedy'
  }, {
    interestCategory: 21,
    name: 'Celebrity'
  }, {
    interestCategory: 21,
    name: 'X Factor'
  }, {
    interestCategory: 21,
    name: 'Series'
  }, {
    interestCategory: 21,
    name: 'Britain got talent'
  }, {
    interestCategory: 21,
    name: 'Gambling'
  }, {
    interestCategory: 21,
    name: 'Gaming'
  }, {
    interestCategory: 21,
    name: 'Reality Television'
  }, {
    interestCategory: 24,
    name: 'Oil & Gas'
  }, {
    interestCategory: 24,
    name: 'Natural Gas'
  }, {
    interestCategory: 24,
    name: 'Coal'
  }, {
    interestCategory: 24,
    name: 'Renewable Energy'
  }, {
    interestCategory: 24,
    name: 'Water'
  }, {
    interestCategory: 25,
    name: 'Games of Throne'
  }, {
    interestCategory: 25,
    name: 'The Saturday Night live'
  }, {
    interestCategory: 25,
    name: 'House of Cards'
  }, {
    interestCategory: 25,
    name: 'Orange is the New'
  }, {
    interestCategory: 25,
    name: 'Black Power'
  }, {
    interestCategory: 25,
    name: 'Black Suits'
  }, {
    interestCategory: 25,
    name: 'The Simpsons'
  }, {
    interestCategory: 25,
    name: 'Friends'
  }, {
    interestCategory: 25,
    name: 'Homeland'
  }, {
    interestCategory: 25,
    name: 'Prison Break'
  }, {
    interestCategory: 25,
    name: '24'
  }, {
    interestCategory: 25,
    name: 'Two and a half men'
  }, {
    interestCategory: 25,
    name: 'Greys Anatomy'
  }, {
    interestCategory: 25,
    name: 'Tyrant'
  }, {
    interestCategory: 25,
    name: 'Veep'
  }, {
    interestCategory: 25,
    name: 'The Walking Dead'
  }, {
    interestCategory: 25,
    name: 'Dr Who'
  }, {
    interestCategory: 25,
    name: 'Netflix Series'
  }, {
    interestCategory: 26,
    name: 'Men’s fashion'
  }, {
    interestCategory: 26,
    name: 'Make up'
  }, {
    interestCategory: 26,
    name: 'Women’s fashion'
  }, {
    interestCategory: 26,
    name: 'Women apparel'
  }, {
    interestCategory: 26,
    name: 'Men’s apparel'
  }, {
    interestCategory: 26,
    name: 'Men’s Suit'
  }, {
    interestCategory: 26,
    name: 'Women’s Hairstyles'
  }, {
    interestCategory: 26,
    name: 'Men’s Hairstyles'
  }, {
    interestCategory: 26,
    name: 'Hair extensions'
  }, {
    interestCategory: 27,
    name: 'Anaheim Ducks'
  }, {
    interestCategory: 27,
    name: 'Arizona Coyotes'
  }, {
    interestCategory: 27,
    name: 'Boston Bruins'
  }, {
    interestCategory: 27,
    name: 'Buffalo Sabres'
  }, {
    interestCategory: 27,
    name: 'Calgary Flames'
  }, {
    interestCategory: 27,
    name: 'Carolina Hurricanes'
  }, {
    interestCategory: 27,
    name: 'Chicago Blackhawks'
  }, {
    interestCategory: 27,
    name: 'Colorado Avalanche'
  }, {
    interestCategory: 27,
    name: 'Columbus Blue Jackets'
  }, {
    interestCategory: 27,
    name: 'Dallas Stars'
  }, {
    interestCategory: 27,
    name: 'Detroit Red Wings'
  }, {
    interestCategory: 27,
    name: 'Los Angeles Kings'
  }, {
    interestCategory: 27,
    name: 'Minnesota Wilds'
  }, {
    interestCategory: 27,
    name: 'Edmonton Oilers'
  }, {
    interestCategory: 27,
    name: 'Montreal Canadiens'
  }, {
    interestCategory: 27,
    name: 'Florida Panthers'
  }, {
    interestCategory: 27,
    name: 'Nashville Predators'
  }, {
    interestCategory: 27,
    name: 'New Jersey Devils'
  }, {
    interestCategory: 27,
    name: 'New York Islanders'
  }, {
    interestCategory: 27,
    name: 'New York Rangers'
  }, {
    interestCategory: 27,
    name: 'Ottawa Senators'
  }, {
    interestCategory: 27,
    name: 'Philadelphia Flyers'
  }, {
    interestCategory: 27,
    name: 'Pittsburgh Penguins'
  }, {
    interestCategory: 27,
    name: 'San Jose Sharks'
  }, {
    interestCategory: 27,
    name: 'St. Louis Blues'
  }, {
    interestCategory: 27,
    name: 'Tampa Bay Lightning'
  }, {
    interestCategory: 27,
    name: 'Toronto Maple Leafs'
  }, {
    interestCategory: 27,
    name: 'Vancouver Canucks'
  }, {
    interestCategory: 27,
    name: 'Washington Capitals'
  }, {
    interestCategory: 27,
    name: 'Winnipeg Jets'
  }, {
    interestCategory: 28,
    name: 'Atlanta Hawks'
  }, {
    interestCategory: 28,
    name: 'Boston Celtics'
  }, {
    interestCategory: 28,
    name: 'Brooklyn Nets'
  }, {
    interestCategory: 28,
    name: 'Charlotte Hornets'
  }, {
    interestCategory: 28,
    name: 'Chicago Bulls'
  }, {
    interestCategory: 28,
    name: 'Cleveland Cavaliers'
  }, {
    interestCategory: 28,
    name: 'Dallas Mavericks'
  }, {
    interestCategory: 28,
    name: 'Denver Nuggets'
  }, {
    interestCategory: 28,
    name: 'Detroit Pistons'
  }, {
    interestCategory: 28,
    name: 'Golden State Warriors'
  }, {
    interestCategory: 28,
    name: 'Houston Rockets'
  }, {
    interestCategory: 28,
    name: 'New Orleans Pelicans'
  }, {
    interestCategory: 28,
    name: 'New York Knicks'
  }, {
    interestCategory: 28,
    name: 'Indiana Pacers'
  }, {
    interestCategory: 28,
    name: 'LA Clippers'
  }, {
    interestCategory: 28,
    name: 'Los Angeles Lakers'
  }, {
    interestCategory: 28,
    name: 'Memphis Grizzlies'
  }, {
    interestCategory: 28,
    name: 'Miami Heat'
  }, {
    interestCategory: 28,
    name: 'Oklahoma City Thunder'
  }, {
    interestCategory: 28,
    name: 'Milwaukee Bucks'
  }, {
    interestCategory: 28,
    name: 'Orlando Magic'
  }, {
    interestCategory: 28,
    name: 'Philadelphia 76ers'
  }, {
    interestCategory: 28,
    name: 'Phoenix Suns'
  }, {
    interestCategory: 28,
    name: 'Portland Trail Blazers'
  }, {
    interestCategory: 28,
    name: 'Sacramento Kings'
  }, {
    interestCategory: 28,
    name: 'San Antonio Spurs'
  }, {
    interestCategory: 28,
    name: 'Toronto Raptors'
  }, {
    interestCategory: 28,
    name: 'Utah Jazz'
  }, {
    interestCategory: 28,
    name: 'Minnesota Timberwolves'
  }, {
    interestCategory: 28,
    name: 'Washington Wizards'
  }, {
    interestCategory: 29,
    name: 'Celebrity Gossip'
  }, {
    interestCategory: 29,
    name: 'Ciara'
  }, {
    interestCategory: 29,
    name: 'Beyoncé'
  }, {
    interestCategory: 29,
    name: 'Rihanna'
  }, {
    interestCategory: 29,
    name: 'Katy Perry'
  }, {
    interestCategory: 29,
    name: 'Drake'
  }, {
    interestCategory: 29,
    name: 'Jay-Y'
  }, {
    interestCategory: 29,
    name: 'The Weekend'
  }, {
    interestCategory: 29,
    name: 'Future'
  }, {
    interestCategory: 29,
    name: 'Kylie Jenner'
  }, {
    interestCategory: 29,
    name: 'Kanye West'
  }, {
    interestCategory: 29,
    name: 'Kim Kardashian'
  }, {
    interestCategory: 29,
    name: 'Lebron James'
  }, {
    interestCategory: 29,
    name: 'Cristiano Ronaldo'
  }, {
    interestCategory: 29,
    name: 'Roger Federer'
  }, {
    interestCategory: 29,
    name: 'Lionel Messi'
  }, {
    interestCategory: 29,
    name: 'Nicki Minaj'
  }, {
    interestCategory: 29,
    name: 'Barack Obama'
  }, {
    interestCategory: 29,
    name: 'Justin Bieber'
  }, {
    interestCategory: 29,
    name: 'Selena Gomez'
  }, {
    interestCategory: 29,
    name: 'Jenifer Lopez'
  }, {
    interestCategory: 29,
    name: 'Taylor Swift'
  }, {
    interestCategory: 29,
    name: 'Stephen Curry'
  }, {
    interestCategory: 29,
    name: 'Kevin Durant'
  }, {
    interestCategory: 29,
    name: 'Michael Jordan'
  }, {
    interestCategory: 29,
    name: '2pac'
  }, {
    interestCategory: 30,
    name: 'Artificial intelligence'
  }, {
    interestCategory: 30,
    name: 'Wearable Tech'
  }, {
    interestCategory: 30,
    name: 'Apple watch'
  }, {
    interestCategory: 30,
    name: 'Iphones'
  }, {
    interestCategory: 30,
    name: 'Driverless Cars'
  }, {
    interestCategory: 31,
    name: 'Arsenal'
  }, {
    interestCategory: 31,
    name: 'Chelsea'
  }, {
    interestCategory: 31,
    name: 'Manchester United'
  }, {
    interestCategory: 31,
    name: 'Liverpool'
  }, {
    interestCategory: 31,
    name: 'Manchester City'
  }, {
    interestCategory: 31,
    name: 'Everton'
  }, {
    interestCategory: 31,
    name: 'Totenham Hotspurs'
  }, {
    interestCategory: 31,
    name: 'Westham'
  }, {
    interestCategory: 31,
    name: 'Southampton'
  }, {
    interestCategory: 32,
    name: 'Mercedes Benz'
  }, {
    interestCategory: 32,
    name: 'Ferrari'
  }, {
    interestCategory: 32,
    name: 'Toyota'
  }, {
    interestCategory: 32,
    name: 'Porsche'
  }, {
    interestCategory: 32,
    name: 'Aston Martin'
  }, {
    interestCategory: 32,
    name: 'Range Rover'
  }, {
    interestCategory: 32,
    name: 'Rolls Royce'
  }, {
    interestCategory: 32,
    name: 'Bentley'
  }, {
    interestCategory: 32,
    name: 'Lamborghini'
  }, {
    interestCategory: 32,
    name: 'Audi'
  }, {
    interestCategory: 32,
    name: 'BMW'
  }, {
    interestCategory: 32,
    name: 'Ford'
  }, {
    interestCategory: 32,
    name: 'Honda'
  }, {
    interestCategory: 32,
    name: 'Volvo'
  }, {
    interestCategory: 32,
    name: 'Nissan'
  }, {
    interestCategory: 32,
    name: 'Land Rover'
  }, {
    interestCategory: 32,
    name: 'Mazda'
  }, {
    interestCategory: 32,
    name: 'Maserati'
  }, {
    interestCategory: 32,
    name: 'Lexus'
  }, {
    interestCategory: 32,
    name: 'Tesla'
  }, {
    interestCategory: 32,
    name: 'Motor Shows'
  }, {
    interestCategory: 32,
    name: 'Motor Bikes'
  }, {
    interestCategory: 33,
    name: 'Arizona Cardinals'
  }, {
    interestCategory: 33,
    name: 'Atlanta Falcons'
  }, {
    interestCategory: 33,
    name: 'Baltimore Ravens'
  }, {
    interestCategory: 33,
    name: 'Buffalo Bills'
  }, {
    interestCategory: 33,
    name: 'Carolina Panthers'
  }, {
    interestCategory: 33,
    name: 'Chicago Bears'
  }, {
    interestCategory: 33,
    name: 'Cincinnati Bengals'
  }, {
    interestCategory: 33,
    name: 'Cleveland Browns'
  }, {
    interestCategory: 33,
    name: 'Dallas Cowboy'
  }, {
    interestCategory: 33,
    name: 'Denver Broncos'
  }, {
    interestCategory: 33,
    name: 'Detroit Lions'
  }, {
    interestCategory: 33,
    name: 'Minnesota Vikings'
  }, {
    interestCategory: 33,
    name: 'Green Bay Packers'
  }, {
    interestCategory: 33,
    name: 'Houston Texans'
  }, {
    interestCategory: 33,
    name: 'Indianapolis Colts'
  }, {
    interestCategory: 33,
    name: 'Jacksonville Jaguars'
  }, {
    interestCategory: 33,
    name: 'Kansas City Chiefs'
  }, {
    interestCategory: 33,
    name: 'Los Angeles Rams'
  }, {
    interestCategory: 33,
    name: 'Los Angeles Chargers'
  }, {
    interestCategory: 33,
    name: 'Miami Dolphin'
  }, {
    interestCategory: 33,
    name: 'New England Patriots'
  }, {
    interestCategory: 33,
    name: 'New Orleans Saints'
  }, {
    interestCategory: 33,
    name: 'New York Giants'
  }, {
    interestCategory: 33,
    name: 'New York Jets'
  }, {
    interestCategory: 33,
    name: 'Oakland Raiders'
  }, {
    interestCategory: 33,
    name: 'Philadelphia Eagles'
  }, {
    interestCategory: 33,
    name: 'Pittsburgh Steelers'
  }, {
    interestCategory: 33,
    name: 'San Francisco 49ers'
  }, {
    interestCategory: 33,
    name: 'Seattle Seahawks'
  }, {
    interestCategory: 33,
    name: 'Tampa Bay Buccaneers'
  }, {
    interestCategory: 33,
    name: 'Tennessee Titans'
  }, {
    interestCategory: 33,
    name: 'Washington Redskins'
  }, {
    interestCategory: 34,
    name: 'Apple'
  }, {
    interestCategory: 34,
    name: 'Samsung'
  }, {
    interestCategory: 34,
    name: 'Microsoft'
  }, {
    interestCategory: 34,
    name: 'Google'
  }, {
    interestCategory: 34,
    name: 'Sony'
  }, {
    interestCategory: 34,
    name: 'LG'
  }, {
    interestCategory: 34,
    name: 'Panasonic'
  }, {
    interestCategory: 34,
    name: 'Uber'
  }, {
    interestCategory: 34,
    name: 'Facebook'
  }, {
    interestCategory: 34,
    name: 'Amazon'
  }, {
    interestCategory: 34,
    name: 'Acer'
  }, {
    interestCategory: 34,
    name: 'HP'
  }, {
    interestCategory: 34,
    name: 'IBM'
  }, {
    interestCategory: 34,
    name: 'Yahoo'
  }, {
    interestCategory: 34,
    name: 'DELL'
  }, {
    interestCategory: 34,
    name: 'Lenovo'
  }, {
    interestCategory: 34,
    name: 'Blackberry'
  }, {
    interestCategory: 34,
    name: 'Adobe'
  }, {
    interestCategory: 34,
    name: 'Intell'
  }, {
    interestCategory: 34,
    name: 'Toshiba'
  }, {
    interestCategory: 34,
    name: 'Bitcoin'
  }, {
    interestCategory: 34,
    name: 'Netflix'
  }, {
    interestCategory: 34,
    name: 'AirBnB'
  }, {
    interestCategory: 35,
    name: 'Airlines'
  }, {
    interestCategory: 35,
    name: 'Boeing'
  }, {
    interestCategory: 35,
    name: 'Aerospace Engineering'
  }, {
    interestCategory: 36,
    name: 'Christianity'
  }, {
    interestCategory: 36,
    name: 'Islamism'
  }, {
    interestCategory: 36,
    name: 'Hinduism'
  }, {
    interestCategory: 36,
    name: 'Theology'
  }, {
    interestCategory: 36,
    name: 'Atheist'
  }, {
    interestCategory: 36,
    name: 'Buddhism'
  }, {
    interestCategory: 36,
    name: 'Scientology'
  }, {
    interestCategory: 36,
    name: 'Sikhism'
  }, {
    interestCategory: 37,
    name: 'Cruise Holiday'
  }, {
    interestCategory: 37,
    name: 'Travel'
  }, {
    interestCategory: 38,
    name: 'Barcelona'
  }, {
    interestCategory: 38,
    name: 'Real Madrid'
  }, {
    interestCategory: 38,
    name: 'Atletico Madrid'
  }, {
    interestCategory: 38,
    name: 'Valencia'
  }, {
    interestCategory: 38,
    name: 'Seville'
  }, {
    interestCategory: 39,
    name: 'Stephen King'
  }, {
    interestCategory: 39,
    name: 'J. K. Rowling'
  }, {
    interestCategory: 39,
    name: 'Dan Brown'
  }, {
    interestCategory: 39,
    name: 'David Baldacci'
  }, {
    interestCategory: 39,
    name: 'John Grisham'
  }, {
    interestCategory: 40,
    name: 'Marriage'
  }, {
    interestCategory: 40,
    name: 'Social work'
  }, {
    interestCategory: 40,
    name: 'Sex'
  }, {
    interestCategory: 40,
    name: 'LGBT'
  }, {
    interestCategory: 40,
    name: 'Weddings'
  }, {
    interestCategory: 40,
    name: 'Relationships'
  }, {
    interestCategory: 40,
    name: 'Kids and Parenting'
  }, {
    interestCategory: 41,
    name: 'Dieting'
  }, {
    interestCategory: 41,
    name: 'Chinese Cuisine'
  }, {
    interestCategory: 41,
    name: 'African Cuisine'
  }, {
    interestCategory: 41,
    name: 'Nutrition'
  }, {
    interestCategory: 41,
    name: 'Healthy Recipes'
  }, {
    interestCategory: 41,
    name: 'Low carb diets'
  }, {
    interestCategory: 41,
    name: 'Recipes'
  }, {
    interestCategory: 41,
    name: 'Grilling Recipes'
  }, {
    interestCategory: 41,
    name: 'Desserts'
  }, {
    interestCategory: 41,
    name: 'Healthy diets'
  }, {
    interestCategory: 42,
    name: 'Microsoft Xbox 360'
  }, {
    interestCategory: 42,
    name: 'Bingo'
  }, {
    interestCategory: 42,
    name: 'PC Games'
  }, {
    interestCategory: 42,
    name: 'FIFA'
  }, {
    interestCategory: 42,
    name: 'Pro Evolution Soccer'
  }, {
    interestCategory: 42,
    name: 'Call Of Duty'
  }, {
    interestCategory: 42,
    name: 'Nintendo Wii U'
  }, {
    interestCategory: 42,
    name: 'Sony PlayStation Ps 4'
  }, {
    interestCategory: 42,
    name: 'Assassin Creed'
  }, {
    interestCategory: 42,
    name: 'Pokemon'
  }, {
    interestCategory: 42,
    name: 'Halo'
  }, {
    interestCategory: 42,
    name: 'Batman'
  }, {
    interestCategory: 42,
    name: 'Far Cry'
  }, {
    interestCategory: 42,
    name: 'Battlefield'
  }, {
    interestCategory: 42,
    name: 'Bioshock'
  }, {
    interestCategory: 42,
    name: 'Destiny'
  }, {
    interestCategory: 42,
    name: 'Football Manager'
  }, {
    interestCategory: 42,
    name: 'Need For Speed'
  }, {
    interestCategory: 42,
    name: 'Dragon Age'
  }, {
    interestCategory: 42,
    name: 'Final Fantasy'
  }, {
    interestCategory: 42,
    name: 'Lego'
  }, {
    interestCategory: 42,
    name: 'Mario'
  }, {
    interestCategory: 42,
    name: 'Elder Scrolls'
  }, {
    interestCategory: 42,
    name: 'Tomb Raider'
  }, {
    interestCategory: 42,
    name: 'Meta Gear'
  }, {
    interestCategory: 42,
    name: 'Pokemon Go'
  }, {
    interestCategory: 42,
    name: 'Fallout'
  }, {
    interestCategory: 43,
    name: 'Science & Fiction'
  }, {
    interestCategory: 43,
    name: 'Biography'
  }, {
    interestCategory: 43,
    name: 'History'
  }, {
    interestCategory: 43,
    name: 'Romance'
  }, {
    interestCategory: 43,
    name: 'Marvel Comics'
  }, {
    interestCategory: 43,
    name: 'Love Quotes'
  }, {
    interestCategory: 43,
    name: 'Funny Quotes'
  }, {
    interestCategory: 44,
    name: 'Anime'
  }, {
    interestCategory: 44,
    name: 'Comedy'
  }, {
    interestCategory: 44,
    name: 'Crime'
  }, {
    interestCategory: 44,
    name: 'Suspense'
  }, {
    interestCategory: 44,
    name: 'Korean'
  }, {
    interestCategory: 44,
    name: 'Musical'
  }, {
    interestCategory: 44,
    name: 'Film Directors'
  }, {
    interestCategory: 44,
    name: 'Sci-Fi-films'
  }, {
    interestCategory: 45,
    name: 'Atlanta Braves'
  }, {
    interestCategory: 45,
    name: 'Florida Marlins'
  }, {
    interestCategory: 45,
    name: 'New York Mets'
  }, {
    interestCategory: 45,
    name: 'Philadelphia Phillies'
  }, {
    interestCategory: 45,
    name: 'Washington'
  }, {
    interestCategory: 45,
    name: 'Nationals Central'
  }, {
    interestCategory: 45,
    name: 'Chicago Cubs'
  }, {
    interestCategory: 45,
    name: 'Cincinnati Reds'
  }, {
    interestCategory: 45,
    name: 'Houston Astros'
  }, {
    interestCategory: 45,
    name: 'Milwaukee Brewers'
  }, {
    interestCategory: 45,
    name: 'Pittsburgh Pirates'
  }, {
    interestCategory: 45,
    name: 'St. Louis Cardinals West Arizona'
  }, {
    interestCategory: 45,
    name: 'Orioles Boston Red Sox New York'
  }, {
    interestCategory: 45,
    name: 'Yankees Tampa Bay`'
  }, {
    interestCategory: 45,
    name: 'Diamondbacks'
  }, {
    interestCategory: 45,
    name: 'Colorado Rockies'
  }, {
    interestCategory: 45,
    name: 'Los Angeles Dodgers'
  }, {
    interestCategory: 45,
    name: 'San Diego Padres'
  }, {
    interestCategory: 45,
    name: 'San Francisco Giants'
  }, {
    interestCategory: 45,
    name: 'American League'
  }, {
    interestCategory: 45,
    name: 'East Baltimore'
  }];

  return db.models.interest.bulkCreate(interest);
})
.then(function () {
  process.exit(0);
})
.catch((error) => {
});
