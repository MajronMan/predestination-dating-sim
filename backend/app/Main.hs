module Main where

import Universum


import Network.Wai.Handler.Warp

import Lib 
 
main :: IO ()
main = do
    let port = 8080
    putStrLn $ "Listening on port " ++ show port 
    run port app
 