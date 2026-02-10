-- Add new room type enum values
ALTER TYPE room_type ADD VALUE IF NOT EXISTS 'cabin';
ALTER TYPE room_type ADD VALUE IF NOT EXISTS 'villa';
ALTER TYPE room_type ADD VALUE IF NOT EXISTS 'full_property';