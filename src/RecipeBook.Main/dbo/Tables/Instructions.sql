﻿CREATE TABLE [dbo].[Instructions]
(
	[RecipeId] UNIQUEIDENTIFIER NOT NULL, 
    [OrdinalPosition] INT NOT NULL, 
    [Instruction] NVARCHAR(250) NOT NULL, 
    CONSTRAINT [PK_Instructions] PRIMARY KEY ([RecipeId], [OrdinalPosition]), 
    CONSTRAINT [FK_Instructions_To_Recipes_Id] FOREIGN KEY ([RecipeId]) REFERENCES [Recipes]([Id]) ,
)