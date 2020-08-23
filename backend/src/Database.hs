{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE DuplicateRecordFields #-}
{-# LANGUAGE OverloadedLabels #-}
{-# LANGUAGE OverloadedStrings #-}

module Database where

import Database.Selda ((!), (.==), (.>=), (:*:) (..), Attr (..))
import qualified Database.Selda as DB
import qualified Database.Selda.PostgreSQL as DB
import Universum

type DialogueId = Text

type StatementId = Text

type AnswerId = Text

data Dialogue = Dialogue
  { id :: DialogueId,
    entry :: StatementId
  }
  deriving (Generic)

instance DB.SqlRow Dialogue

data Statement = Statement
  { id :: StatementId,
    text :: Text,
    dialogueId :: DialogueId
  }
  deriving (Generic)

instance DB.SqlRow Statement

data Answer = Answer
  { id :: AnswerId,
    text :: Text,
    statementId :: StatementId,
    next :: StatementId
  }
  deriving (Generic)

instance DB.SqlRow Answer

dialogues :: DB.Table Dialogue
dialogues = DB.table "dialogues" [#id :- DB.primary]

statements :: DB.Table Statement
statements = DB.table "statements" [#id :- DB.primary, #dialogueId :- DB.foreignKey dialogues #id]

answers :: DB.Table Answer
answers = DB.table "answers" [#id :- DB.primary, #statementId :- DB.foreignKey statements #id]

doStuff :: IO ()
doStuff = DB.withPostgreSQL ("predestination" `DB.on` "localhost" `DB.auth` ("postgres", "postgres")) $ do
  DB.tryCreateTable dialogues
  DB.tryCreateTable statements
  DB.tryCreateTable answers
  DB.insertUnless
    dialogues
    (\s -> s ! #id .== "1")
    [ Dialogue "1" "1"
    ]
  DB.insertUnless statements (\s -> s ! #id .== "1") [Statement "1" "Hi" "1"]

  dialogueAndStatements <- DB.query $ do
    dialogue <- DB.select dialogues
    statement <- DB.select statements
    DB.restrict (statement ! #dialogueId .== dialogue ! #id)
    -- DB.restrict (person ! #age .>= 18)
    return ((statement ! #id) :*: (statement ! #text))
  liftIO $ print dialogueAndStatements
