CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"tasks" VARCHAR(60) NOT NULL,
	"completed" BOOLEAN DEFAULT FALSE
); 