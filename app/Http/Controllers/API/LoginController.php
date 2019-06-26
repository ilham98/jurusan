<?php

namespace App\Http\Controllers\API;

use App\Admin;
use App\Dosen;
use App\RefreshToken;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Cookie;

class LoginController extends Controller {

    public function login(Request $request) {

        $this->validate($request, [
            'nidn' => 'required',
            'password' => 'required'
        ]);

        $user = Admin::where([
            'nidn' => $request->nidn
        ])->first(); 

        $role = 'admin';

        if(!$user) {
            $user = Dosen::where([
                'nidn' => $request->nidn
            ])->first();

            if($user) {
                $role = 'dosen';
            } else {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
        }

        $isPasswordTrue = Hash::check($request->password, $user->password);

        if(!$isPasswordTrue)
            return response(['message' => 'Invalid password'], 403);
        // return str_random(32);

        // return response($user, 200);

        $time = time();

        $key = "example_key";
        $sub = array('user_id' => $user->nidn, 'role' => 'admin');
        $access_token = array(
            'iss' => "lumen-jwt", // Issuer of the token
            'sub' => $sub, // Subject of the token
            'iat' => $time, // Time when JWT was issued. 
            'exp' => $time + 60 * 60 * 24 // Expiration time
        );

        $refresh_token = array(
            'iss' => "lumen-jwt", // Issuer of the token
            'sub' => $sub, // Subject of the token
            'iat' => $time, // Time when JWT was issued. 
            'exp' => $time + 60 * 60 * 24 // Expiration time
        );

        $jwt = JWT::encode($access_token, $key);
        $jwt2 = JWT::encode($refresh_token, $key);
        $user->access_token = $jwt;
        $user->refresh_token = $jwt2;
        $user->role = $role;
        $refresh_token_exp = date('Y-m-d H:i:s', $time + 60 * 60 * 24);

        RefreshToken::create([
            'token' => $jwt2,
            'expiration' => $refresh_token_exp,
        ]);

        return response($user)
            ->withCookie(cookie('access_token', $jwt, 60 * 24, '/', null, false, true))
            ->withCookie(cookie('refresh_token', $jwt2, 60 * 24, '/', null, false, true))
            ->withCookie(cookie('authenticated', true, 60 * 24, '/', null, false, false))
            ->withCookie(cookie('user_id', $user->nidn, 60 * 24, '/', null, false, false))
            ->withCookie(cookie('role', $role, 60 * 24, '/', null, false, false));
    }

}
