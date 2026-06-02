{
  description = "BA Event monorepo — Laravel API + Next.js frontend";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        php = pkgs.php.buildEnv {
          extensions = { enabled, all }: enabled ++ (with all; [
            bcmath
            curl
            dom
            fileinfo
            gd
            intl
            mbstring
            pdo
            pdo_pgsql
            pdo_sqlite
            pgsql
            posix
            readline
            session
            simplexml
            sodium
            tokenizer
            xmlwriter
            zip
          ]);
          extraConfig = ''
            memory_limit = 2G
            max_execution_time = 300
          '';
        };

        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = [
            php
            php.packages.composer
            pkgs.nodejs_22
          ];

          shellHook = ''
            PATH="$PWD/api/vendor/bin:$PATH"
            PATH="$PWD/web/node_modules/.bin:$PATH"
            export PATH
            echo "Nix shell — PHP $(php -v | head -n1 | cut -d' ' -f2), Composer $(composer --version 2>/dev/null | cut -d' ' -f3), Node $(node --version)"
          '';
        };
      });
}
