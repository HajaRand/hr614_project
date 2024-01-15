-- Create Address Table
CREATE TABLE Address (
    AddressId SERIAL PRIMARY KEY,
    AddressLine VARCHAR(50),
    AddressLine2 varchar(50),
    City varchar(50),
    Province varchar(50),
    Postcode VARCHAR(10),
    Country varchar(50)
);

-- Create Role Table
CREATE TABLE Role (
    RoleId SERIAL PRIMARY KEY,
    RoleName VARCHAR(20) UNIQUE
);

-- Create Users Table
CREATE TABLE Users (
    UserId SERIAL PRIMARY KEY,
    FirstName varchar(50),
    LastName varchar(50),
    Email varchar(50),
    Phone VARCHAR(20)
);

-- Create UserRole Table
CREATE TABLE UserRole (
    UserRoleID SERIAL PRIMARY KEY,
    UserId INT REFERENCES Users(UserId),
    RoleId INT REFERENCES Role(RoleId)
);

-- Create Permissions Table
CREATE TABLE Permission (
    PermissionId SERIAL PRIMARY KEY,
    PermissionName VARCHAR(50) UNIQUE
);

-- Create RolePermission Table
CREATE TABLE RolePermission (
    RolePermissionId SERIAL PRIMARY KEY,
    RoleId INT REFERENCES Role(RoleId),
    PermissionId INT REFERENCES Permission(PermissionId)
);

-- User Profile Table
CREATE TABLE user_profile (
    UserId INT REFERENCES Users(UserId),
    prosthetic_info TEXT,
    create_date TIMESTAMP NOT NULL,
    last_login_date TIMESTAMP
);

-- Exercise Preferences Table
CREATE TABLE exercise_preferences (
    preference_id SERIAL PRIMARY KEY,
    UserId INT REFERENCES Users(UserId),
    exercise_type VARCHAR(100),
    intensity_level VARCHAR(50),
    duration INT,
    frequency INT
);

-- Workout Sessions Table
CREATE TABLE workout_sessions (
    session_id SERIAL PRIMARY KEY,
    UserId INT REFERENCES Users(UserId),
    session_date DATE,
    duration INT,
    exercises TEXT,
    feedback TEXT
);

-- Customization Settings Table
CREATE TABLE customization_settings (
    setting_id SERIAL PRIMARY KEY,
    UserId INT REFERENCES Users(UserId),
    voice_guidance VARCHAR(100),
    visual_aid VARCHAR(100),
    music_style VARCHAR(100),
    notification_settings TEXT
);

-- Progress Tracking Table
CREATE TABLE progress_tracking (
    progress_id SERIAL PRIMARY KEY,
    UserId INT REFERENCES Users(UserId),
    start_date DATE,
    goals TEXT,
    achievements TEXT,
    exercise_data TEXT
);

-- Exercise Library Table
CREATE TABLE exercise_library (
    exercise_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    difficulty_level VARCHAR(50),
    prosthetic_friendly BOOLEAN,
    video_url TEXT
);

-- Social Interaction Table
CREATE TABLE social_interaction (
    interaction_id SERIAL PRIMARY KEY,
    UserId INT REFERENCES Users(UserId),
    connected_users TEXT,
    shared_achievements TEXT,
    community_posts TEXT
);

-- Data Privacy and Security Table
CREATE TABLE data_privacy_security (
    privacy_id SERIAL PRIMARY KEY,
    UserId INT REFERENCES Users(UserId),
    data_sharing_preferences TEXT,
    deletion_requests TEXT
);

-- Feedback and Suggestions Table
CREATE TABLE feedback_suggestions (
    feedback_id SERIAL PRIMARY KEY,
    UserId INT REFERENCES Users(UserId),
    feedback_date DATE NOT NULL,
    content TEXT,
    response TEXT
);
