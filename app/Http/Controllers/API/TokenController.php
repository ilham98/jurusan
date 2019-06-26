<?php

namespace App\Http\Controllers\API;

use Cookie;
use App\Admin;
use App\RefreshToken;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class TokenController extends Controller {

    public function refreshToken(Request $request) {
        $token = Cookie::get('refresh_token');
        $refresh_token = RefreshToken::where('token', $token)->first();

        if(!$refresh_token) {
            return response()->json([
                'error' => 'Provided token is expired.'
            ], 400);
        } else {
            if($refresh_token->revoked === 1) {
                return response()->json([
                'error' => 'Provided token is revoked.'
                ], 400);
            }
        }


        $key = "example_key";

        try {
            $credentials = JWT::decode($refresh_token->token, $key, ['HS256']);
        } catch(\Exception $e) {
            return response()->json([
                'error' => 'An error while decoding token.'
            ], 400);
        } catch(\Firebase\JWT\ExpiredException $e) {
            return response()->json([
                'error' => 'Provided token is expired.'
            ], 400);
        }

        $sub = (array)$credentials->sub;

        $access_token = array(
            'iss' => "lumen-jwt", // Issuer of the token
            'sub' => $sub, // Subject of the token
            'iat' => time(), // Time when JWT was issued. 
            'exp' => time() + 60 * 60 // Expiration time
        );
        $user = Admin::find($credentials->sub->user_id);

        $jwt = JWT::encode($access_token, $key);
        $jwt2 =  $token;
        $user->access_token = $jwt;
        $user->refresh_token = $jwt2;

        return $user;

    }
    
}
