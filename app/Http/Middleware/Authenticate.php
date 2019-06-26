<?php

namespace App\Http\Middleware;


use Closure;
use Cookie;
use App\Admin;
use App\Dosen;
use App\RefreshToken;
use Firebase\JWT\JWT;
// use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Factory as Auth;

class Authenticate
{
    public function handle($request, Closure $next, ...$guards)
    {   
        $token = Cookie::get('access_token');

        if(!$token) {
            return response()->json([
                'error' => 'Token not provided'
            ], 401);
        }

        $key = 'example_key';

        try {
            $credentials = JWT::decode($token, $key, ['HS256']);
        } catch(\Exception $e) {
            return response()->json([
                'error' => 'An error while decoding token.'
            ], 400);
        } catch(\Firebase\JWT\ExpiredException $e) {
            return response()->json([
                'error' => 'Provided token is expired.'
            ], 400);
        } 
        $role = 'dosen';
        $admin = Admin::where('nidn', $credentials->sub->user_id)->first();
        if($admin)
            $role = 'admin';
        $dosen = Dosen::where('nidn', $credentials->sub->user_id)->first();
        if($dosen)
            $role = 'dosen';
        $request->user = $admin ? $admin : $dosen;
        $request->user->role = $role;

        foreach($guards as $guard) {
            if($request->user->role !== $guard)
                return response()->json([
                    'error' => 'Unauthorized'
                ], 401);
        }

        return $next($request);
    }
}
