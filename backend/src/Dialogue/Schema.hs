{-# LANGUAGE DeriveAnyClass #-}
{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE DuplicateRecordFields #-}
{-# LANGUAGE OverloadedLabels #-}
{-# LANGUAGE OverloadedStrings #-}

module Dialogue.Schema
  ( DialogueId,
    StatementId,
    AnswerId,
    Dialogue (..),
    Statement (..),
    Answer (..),
    DialogueRow (..),
    dialogues,
    serialize,
    deserialize,
  )
where

import qualified Data.Aeson as A
import Database.Selda (Attr (..))
import qualified Database.Selda as DB
import qualified Database.Selda.PostgreSQL as DB
import Database.Selda.SqlType
import Universum

type DialogueId = Text

type StatementId = Text

type AnswerId = Text

data Dialogue = Dialogue
  { _id :: DialogueId,
    _entry :: StatementId,
    _statements :: [Statement]
  }
  deriving (Generic, Show, Eq, A.FromJSON, A.ToJSON)

data Statement = Statement
  { _id :: StatementId,
    _text :: Text,
    _answers :: [Answer]
  }
  deriving (Generic, Show, Eq, A.FromJSON, A.ToJSON)

data Answer = Answer
  { _id :: AnswerId,
    _text :: Text,
    _next :: StatementId
  }
  deriving (Generic, Show, Eq, A.FromJSON, A.ToJSON)

data DialogueRow = DialogueRow
  { _id :: DialogueId,
    _dialogue :: A.Value
  }
  deriving (Generic, Show, Eq)

instance DB.SqlRow DialogueRow

serialize :: Dialogue -> DialogueRow
serialize d = DialogueRow (_id (d :: Dialogue)) (A.toJSON d)

deserialize :: DialogueRow -> Dialogue
deserialize (DialogueRow _ dialogue) = case A.fromJSON dialogue of
  A.Success d -> d
  A.Error e -> error (fromString e)

dialogues :: DB.Table DialogueRow
dialogues = DB.table "dialogues" [#_id :- DB.primary]
