{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE DuplicateRecordFields #-}
{-# LANGUAGE OverloadedLabels #-}
{-# LANGUAGE OverloadedStrings #-}

module Dialogue.Queries where

import qualified Configuration.Dotenv as Dotenv
import qualified Data.Aeson as A
import qualified Data.Map.Strict as M
import Database.Selda ((!), (.&&), (.==), (.>=), (.||), (:*:) (..), Attr (..))
import qualified Database.Selda as DB
import qualified Database.Selda.PostgreSQL as DB
import Dialogue.Schema
import System.Environment (getEnv)
import Universum

getEnvText :: String -> IO Text
getEnvText s = fromString <$> getEnv s

withPSQLConfig :: DB.SeldaT DB.PG IO a -> IO a
withPSQLConfig stuff = do
  Dotenv.loadFile Dotenv.defaultConfig
  dbName <- getEnvText "DB_NAME"
  dbUrl <- getEnvText "DB_URL"
  dbUsername <- getEnvText "DB_USERNAME"
  dbPassword <- getEnvText "DB_PASSWORD"
  DB.withPostgreSQL (dbName `DB.on` dbUrl `DB.auth` (dbUsername, dbPassword)) $ stuff

exampleDialogue :: Dialogue
exampleDialogue =
  Dialogue
    { _id = "Faithful Encounter",
      _entry = "Hou",
      _statements =
        [ Statement
            { _id = "Hou",
              _text = "Hou... mukatte kuru no ka?",
              _answers =
                [ Answer
                    { _id = "Hou1",
                      _text = "Nigetsu ni kono DIO ni chikazuite kuruno ka?",
                      _next = "Shiken"
                    },
                  Answer
                    { _id = "Hou2",
                      _text = "Sekkaku sofu no Josefu ga watashi no Za Warudo no shotai wo.",
                      _next = "Kisshi"
                    }
                ]
            },
          Statement
            { _id = "Shiken",
              _text = "Shiken shuryu chaimu chokuzen made mondai yo toitte iru jukensee ne you na?",
              _answers =
                [ Answer
                    { _id = "Shiken1",
                      _text = "H O H O!",
                      _next = "Kisshi"
                    },
                  Answer
                    { _id = "Shiken2",
                      _text = "Dewa juubun chikazukanai youi.",
                      _next = "Hou"
                    }
                ]
            },
          Statement
            { _id = "Kisshi",
              _text = "Kisshi koita kibun de wo shietekure ta to yuu no ni?",
              _answers =
                [ Answer
                    { _id = "Kisshi1",
                      _text = "ORA!",
                      _next = "Shiken"
                    },
                  Answer
                    { _id = "Kisshi2",
                      _text = "Noroi, noroi! Za Warudo wa saikyou no Sutando da.",
                      _next = "Hou"
                    }
                ]
            }
        ]
    }

seed :: (MonadIO m, MonadMask m) => DB.SeldaT DB.PG m ()
seed = do
  DB.tryCreateTable dialogues
  DB.insert_ dialogues [serialize exampleDialogue]

getDialogue :: DialogueId -> IO (Either A.Value A.Value)
getDialogue id = do
  ds <-
    withPSQLConfig
      $ DB.query
      $ DB.select dialogues `DB.suchThat` (\d -> d ! #_id .== DB.literal id)
  case ds of
    [d] -> return (Right (_dialogue d))
    _ -> return (Left $ A.String "Dialogue not found")

-- doStuff :: IO ()
-- doStuff = withPSQLConfig $ do
--   -- seed
--   let id = "Faithful Encounter"
--   dials <- DB.query $ do
--     dialogue <- DB.select dialogues
--     DB.restrict (dialogue ! #_id .== id)

--     return (dialogue)

--   -- let mp = M.fromListWith (<>) [(_id (d :: DialogueRow), [(d,s,a)]) | (d :*: s :*: a) <- dials]
--   -- let ds = M.map (\v -> ) mp
--   -- liftIO $ print mp
--   print $ map deserialize dials

-- dialogueAndStatements <- DB.query $ do
--   dialogue <- DB.select dialogues
--   statement <- DB.select statements
--   DB.restrict (statement ! #_dialogueId .== dialogue ! #_id)
--   return ((statement ! #_id) :*: (statement ! #_text))
-- liftIO $ print dialogueAndStatements
