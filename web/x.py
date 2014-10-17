# Move utility functions here

# Command to run the crawler on a vm. Replace with runcrawler.bat if running on same machine
vm_cmd = 'vmrun -T fusion -gu Shauvik -gp passw0rd runProgramInGuest /Volumes/Secondary/VM/Windows\ 7\ x64.vmwarevm/Windows\ 7\ x64.vmx -activeWindow -interactive "Z:\\xpert\\runcrawler.bat" '

# Path to libraries
lib_prefix = "Z:/xpert/lib"

# Classpath separator (: for *nix and ; for windows)
cp_separator = ";"

# Java path
java = "/usr/bin/java"

# Xpert path on host
xpert_path = "/Volumes/Secondary/xpert"

# Xpert output
xpert_out = xpert_path+"/web/out"

# Xpert jar
xpert_jar = xpert_path +"/xpert.jar"

# Xpert Main Class
xpert_main = "edu.gatech.xpert.XpertMain"
