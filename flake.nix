{
  description = "Laravel 13 development environment";

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
            pdo_sqlite
            posix
            readline
            session
            simplexml
            sodium
            tokenizer
            xml
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
            PATH="$PWD/vendor/bin:$PATH"
            PATH="$PWD/node_modules/.bin:$PATH"
            export PATH
            echo "Laravel dev shell ready"
            echo "  PHP:  $(php -v | head -n1)"
            echo "  Composer: $(composer --version 2>/dev/null)"
            echo "  Node: $(node --version)"
            echo "  NPM:  $(npm --version)"
          '';
        };
      });
}
