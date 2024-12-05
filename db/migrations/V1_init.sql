CREATE TABLE USERS (
    id VARCHAR(20) PRIMARY KEY,
    `password` VARCHAR(255) NOT NULL,
    user_name VARCHAR(20),
    email VARCHAR(50),
    address VARCHAR(70),
    profile_photo VARCHAR(100) NOT NULL,
    signup_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE AREA (
    signgu_cd VARCHAR(5) PRIMARY KEY,
    area_cd VARCHAR(2),
    area_nm VARCHAR(10),
    signgu_nm VARCHAR(10),
    user_address VARCHAR(70),
    CONSTRAINT fk_area_user_address FOREIGN KEY (user_address) REFERENCES users(address)
);

CREATE TABLE TRIP (
    idx INT AUTO_INCREMENT PRIMARY KEY,
    start_date DATE NOT NULL,
    last_date DATE NOT NULL,
    add_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    title VARCHAR(50) NOT NULL,
    user_id VARCHAR(20) NOT NULL,
    CONSTRAINT fk_trip_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE MAP (
    idx INT AUTO_INCREMENT PRIMARY KEY,
    start_point VARCHAR(30) NOT NULL,
    start_place VARCHAR(30) NOT NULL,
    goal_point VARCHAR(30) NOT NULL,
    goal_place VARCHAR(30) NOT NULL,
    waypoints_point VARCHAR(255),
    waypoints_place VARCHAR(255),
    days INT NOT NULL,
    user_id VARCHAR(20) NOT NULL,
    trip_title VARCHAR(50) NOT NULL,
    CONSTRAINT fk_map_trip FOREIGN KEY (trip_title) REFERENCES trip(title),
    CONSTRAINT fk_map_users FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE CHECKLIST (
    idx INT AUTO_INCREMENT PRIMARY KEY,
    checkList VARCHAR(255),
    user_id VARCHAR(20) NOT NULL,
    trip_title VARCHAR(50) NOT NULL,
    CONSTRAINT fk_checklist_trip FOREIGN KEY (trip_title) REFERENCES trip(title),
    CONSTRAINT fk_checklist_users FOREIGN KEY (user_id) REFERENCES users(id)
);
