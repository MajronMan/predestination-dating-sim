module Lib
    ( app
    ) where

import Universum

import Data.ByteString.Builder (byteString)
import qualified Network.Wai as Wai 
import qualified Network.HTTP.Types   as H
import qualified Data.ByteString.UTF8 as BU 

app req respond = respond $
  case Wai.requestMethod req of 
    "OPTIONS" -> Wai.responseLBS H.status200 corsHeaders mempty
    "GET" -> case Wai.pathInfo req of
        "api" : "v1" : _ -> handleApi req
        _ -> notFound
 
    _ -> notFound

notFound = Wai.responseBuilder H.status404 [] mempty

handleApi req = 
  case Wai.pathInfo req of
    _ : _ : ["hello"] -> Wai.responseBuilder H.status200 (corsHeaders <> [("Content-Type", "application/json")]) $ byteString "{\"result\": \"hello world\"}"
    _ : _ : ["krzysiu"] -> Wai.responseBuilder H.status201 (corsHeaders <> [("Content-Type", "application/json")]) $ byteString "{\"result\": \"lubię cycki\"}"
    _ -> notFound

corsHeaders :: H.ResponseHeaders
corsHeaders =
  [ ("Access-Control-Allow-Methods", "POST, HEAD, GET")
  , ("Access-Control-Allow-Origin", "*")
  , ("Access-Control-Allow-Headers", "Content-Type")
  ]
