module Lib
  ( app,
  )
where

import qualified Data.Aeson as A
import Data.Aeson ((.=))
import Data.ByteString.Builder (byteString)
import qualified Data.ByteString.Lazy as BSL
import qualified Data.ByteString.UTF8 as BU
import qualified Dialogue.Queries as Q
import qualified Network.HTTP.Types as H
import qualified Network.Wai as Wai
import Universum

app :: Wai.Application
app req respond = 
  case Wai.requestMethod req of
    "OPTIONS" -> respond handleCors
    "GET" -> case Wai.pathInfo req of
      "api" : "v1" : _ -> handleApi req respond
      _ -> respond notFound
    _ -> respond notFound

notFound = Wai.responseBuilder H.status404 [] mempty

handleApi req respond =
  case Wai.pathInfo req of
    _ : _ : ["hello"] -> respond $ Wai.responseBuilder H.status200 (corsHeaders <> [("Content-Type", "application/json")]) $ byteString $ encodeResult (Right ("hello world" :: Text))
    _ : _ : ["krzysiu"] -> respond $ Wai.responseBuilder H.status201 (corsHeaders <> [("Content-Type", "application/json")]) $ byteString $ encodeResult (Right ("lubię placki" :: Text))
    _ : _ : ["dialogue", id] -> Q.getDialogue id >>= \d -> respond (Wai.responseBuilder H.status200 (corsHeaders <> [("Content-Type", "application/json")]) . byteString $ encodeResult d)
    _ -> respond notFound 

handleCors = Wai.responseLBS H.status200 corsHeaders mempty

corsHeaders :: H.ResponseHeaders
corsHeaders =
  [ ("Access-Control-Allow-Methods", "POST, HEAD, GET"),
    ("Access-Control-Allow-Origin", "*"),
    ("Access-Control-Allow-Headers", "Content-Type")
  ]

encodeResult :: A.ToJSON a => Either a a -> BU.ByteString
encodeResult (Right result) = BSL.toStrict $ A.encode (A.object ["result" .= result])
encodeResult (Left error) = BSL.toStrict $ A.encode (A.object ["error" .= error])


-- getDialogue :: DialogueId -> IO (Maybe DialogueRow)
-- getDialogue id = withPSQLConfig $ do
--   ds <- DB.query $ do
--     -- dialogue <- dialogues `DB.suchThat` (\d -> d ! #_id .== id)
--     -- return dialogue
--     d <- DB.select dialogues
--     DB.restrict (d ! #_id .== id)
--     return d
--   case ds of
--     [d] -> return (Just d)
--     _ -> return Nothing
