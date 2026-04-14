{
  description = "Emacs keybinds reference app";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      packages.${system}.default = pkgs.buildNpmPackage {
        pname = "emacs-keybinds";
        version = "0.0.1";
        src = ./.;

        npmDepsHash = "sha256-OB8PVU1qypOL73jyopEzffprzWfuErj0rz4FKIQ8uYc=";

        buildPhase = ''
          npm run build
        '';

        installPhase = ''
          mkdir -p $out/share/emacs-keybinds
          cp -r dist/* $out/share/emacs-keybinds/
        '';
      };

      devShells.${system}.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          nodejs
        ];
      };

      nixosModules.default = { config, lib, pkgs, ... }:
        let
          cfg = config.services.emacs-keybinds;
          pkg = self.packages.${system}.default;
        in
        {
          options.services.emacs-keybinds = {
            enable = lib.mkEnableOption "emacs-keybinds reference server";
            port = lib.mkOption {
              type = lib.types.port;
              default = 8090;
              description = "Port to serve the app on";
            };
          };

          config = lib.mkIf cfg.enable {
            systemd.services.emacs-keybinds = {
              description = "Emacs Keybinds Reference";
              wantedBy = [ "multi-user.target" ];
              after = [ "network.target" ];
              serviceConfig = {
                ExecStart = "${pkgs.static-web-server}/bin/static-web-server --port ${toString cfg.port} --root ${pkg}/share/emacs-keybinds";
                DynamicUser = true;
                Restart = "on-failure";
              };
            };
          };
        };
    };
}
