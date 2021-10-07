CREATE TABLE [dbo].[Users]
(
    [Username] NVARCHAR(50) NOT NULL, 
    [HashedPassword] NVARCHAR(MAX) NOT NULL, 
    [CreatedDate] DATETIMEOFFSET NOT NULL DEFAULT (GETUTCDATE()), 
    PRIMARY KEY ([Username])
)
