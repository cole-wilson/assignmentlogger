import os, glob, re, rjsmin, rcssmin

if os.path.isdir('build'):
	os.system('rm -rf build')

os.system('mkdir build')
os.system('cp -r lib/* build')
os.chdir('build')
for file in glob.glob("*.*"):
	for x in re.findall('<<(.*?)>>',open(file).read()):
		print(x)
		if os.getenv(x) != None:
			os.system("sed -i 's|<<"+re.escape(x)+">>|"+os.getenv(x)+"|g' "+file+"")
		else:
			print('Environment variable "'+x+'" does not exist.')

if os.getenv("MINIFY") == "TRUE":
	for filename in glob.glob("*.*"):
		if filename.endswith(".css"):
			f = open(filename,'w+')
			old = open(filename,'r').read()
			f.write(rcssmin.cssmin(old, keep_bang_comments=True))
			print(rcssmin.cssmin(old, keep_bang_comments=True))
			f.close()
			os.system('mv ' + filename + ' ' + filename.replace('.css','.min.css'))
		elif filename.endswith(".js"):
			f = open(filename,'w+')
			old = f.read()
			f.write(rjsmin.jsmin(old, keep_bang_comments=True))
			f.close()
			os.system('mv ' + filename + ' ' + filename.replace('.js','.min.js'))