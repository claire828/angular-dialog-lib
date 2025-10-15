-- PostgreSQL initialization script
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE IF NOT EXISTS content_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id VARCHAR(255) NOT NULL,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    engagement_score DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    preferred_sources TEXT[],
    preferred_tags TEXT[],
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS content_cache (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cache_key VARCHAR(255) UNIQUE NOT NULL,
    content_data JSONB NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_content_analytics_content_id ON content_analytics(content_id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_content_cache_key ON content_cache(cache_key);
CREATE INDEX IF NOT EXISTS idx_content_cache_expires ON content_cache(expires_at);

-- Insert sample data
INSERT INTO content_analytics (content_id, views, likes, shares, engagement_score) VALUES
('1', 1250, 89, 23, 8.5),
('2', 890, 67, 12, 7.2)
ON CONFLICT DO NOTHING;

INSERT INTO user_preferences (user_id, preferred_sources, preferred_tags, language) VALUES
('user1', ARRAY['Youtube Channel', 'Blog'], ARRAY['AI', 'Technology'], 'en'),
('user2', ARRAY['Blog'], ARRAY['Design', 'Web'], 'zh')
ON CONFLICT DO NOTHING;
