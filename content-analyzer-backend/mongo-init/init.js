// MongoDB initialization script
db = db.getSiblingDB('mydatabase');

// Create collections
db.createCollection('content_items');
db.createCollection('sources');
db.createCollection('users');

// Create indexes
db.content_items.createIndex({ source: 1 });
db.content_items.createIndex({ date: -1 });
db.content_items.createIndex({ tags: 1 });

db.sources.createIndex({ url: 1 }, { unique: true });

// Insert sample data
db.content_items.insertMany([
  {
    _id: '1',
    title: 'Latest AI Technology Explained',
    source: 'Youtube Channel',
    date: '2025-06-28',
    summary: 'This video details the latest advancements in AI technology and applications',
    tags: ['AI', 'Technology'],
    url: 'https://youtube.com/watch?v=123',
    thumbnail: 'https://picsum.photos/300/200?random=1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

db.sources.insertMany([
  {
    _id: '1',
    name: 'Youtube Channel',
    type: 'youtube',
    url: 'https://youtube.com/tech',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

print('MongoDB initialized successfully!');
