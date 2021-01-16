const fs = require('fs');
const casual = require('casual');
const consola = require('consola');
const { sub } = require('date-fns');

const trophyList = [
  'Mr. Green',
  'Earth Saviour',
  'Novice Planter',
  'Green thumb Jr.',
  'Green Thumb Sr.',
  'Earth Cleaner',
  'Earth Cleaner Veteran',
  'Environmentalist lvl 1',
  'Environmentalist lvl 2',
  'Environmentalist lvl 3',
  'Recycling Enthusiast',
  'Green Influencer Novice',
  'Green Influencer Veteran',
];

const generator = mode => {
  casual.seed(1);
  let MAX_USERS = 100;
  let MAX_POSTS = 1000;
  let MAX_COMMENTS = 10;
  let MAX_EVENTS = 100;

  if (mode === 'development') {
    MAX_USERS = 10;
    MAX_POSTS = 10;
    MAX_COMMENTS = 5;
    MAX_EVENTS = 10;
  }

  const data = { users: [], posts: [], comments: [], events: [] };

  casual.define('user', () => {
    return {
      firstName: casual.first_name,
      lastName: casual.last_name,
      email: casual.email,
      phoneNo: casual.phone,
      password: casual.password,
      events: array_of(casual.integer(1, MAX_EVENTS / 4), 1, MAX_USERS),
      points: Math.ceil((casual.integer(100, 5000) + 1) / 10) * 10,
      trophies: getRandomSubarray(trophyList, casual.integer(1, 15)),
      createdAt: casual.unix_time,
    };
  });

  casual.define('event', () => {
    const startTime = casual.unix_time;

    return {
      name: casual.title,
      shortDescription: casual.short_description,
      description: casual.description,
      location: {
        street: casual.street,
        city: casual.city,
        zipcode: casual.zipcode,
        state: casual.state,
        country: casual.country,
        latitude: casual.latitude,
        longitude: casual.longitude,
      },
      users: array_of(casual.integer(2, MAX_USERS / 4), 1, MAX_USERS),
      startTime: startTime,
      endTime: sub(startTime, { days: casual.integer(1, 7) }).toISOString(),
      createdBy: casual.integer(1, 100),
      createdAt: sub(startTime, { days: casual.integer(7, 30) }).toISOString(),
    };
  });

  casual.define('post', () => {
    return {
      title: casual.title,
      content: casual.description,
      likes: casual.integer(100, 2500),
      userId: casual.integer(1, MAX_USERS),
      createdAt: casual.unix_time,
    };
  });

  casual.define('comment', () => {
    return {
      content: casual.sentence,
      likes: casual.integer(1, 100),
      postId: undefined, // To be added on runtime
      userId: casual.integer(1, MAX_USERS),
      createdAt: casual.unix_time,
    };
  });

  // Create users
  consola.success('Creating new users!');
  for (let i = 1; i <= MAX_USERS; i++) {
    data.users.push({ id: i, ...casual.user });
    consola.debug(`Pushed user ${i}`);
  }
  consola.success(`${MAX_USERS} users generated!`);

  // Create posts
  consola.success('Creating new posts!');
  let curr_comments_count = 0;
  for (let i = 1; i <= MAX_POSTS; i++) {
    data.posts.push({ id: i, ...casual.post });
    consola.debug(`Pushed post ${i}`);

    // Create comments
    last_comments_count = curr_comments_count;
    curr_comments_count += casual.integer(1, MAX_COMMENTS);
    for (let j = last_comments_count; j <= curr_comments_count; j++) {
      data.comments.push({ id: j, ...casual.comment, postId: i });
      consola.debug(`Pushed comment ${j} for post ${i}`);
    }
  }
  consola.success(
    `${MAX_POSTS} posts with ${MAX_COMMENTS} comments each generated!`
  );

  // Create events
  consola.success('Creating new events!');
  for (let i = 1; i <= MAX_EVENTS; i++) {
    data.events.push({ id: i, ...casual.event });
    consola.debug(`Pushed event ${i}`);
  }
  consola.success(`${MAX_EVENTS} events generated!`);

  return data;
};

const array_of = (size, start, end) => {
  size = parseInt(size);
  const result = [];

  for (let i = 0; i < size; i++) {
    let temp = casual.integer(start, end);
    while (result.includes(temp)) {
      temp = casual.integer(start, end);
    }
    result.push(temp);
  }

  return result;
};

const getRandomSubarray = (arr, size) => {
  const shuffled = arr.slice(0);
  let i = arr.length;

  while (i--) {
    const index = Math.floor((i + 1) * Math.random());
    const temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
};

const mode = process.env.NODE_ENV;
const data = generator(mode);
consola.success('Generation completed. Populating latest json into db.json');

fs.writeFile(
  mode === 'development' ? 'dev_db.json' : 'db.json',
  JSON.stringify(data),
  'utf8',
  () => consola.success('db.json populated!')
);
