cd rythm-price-micro-serv
docker build -t rythm/rythem-price-micro-serv .

cd ..

cd rythm-micro-serv-cdk
npm install
npm run build
cdk synth "*"
cdk deploy "*"