Commands 
```sh
npm install -g @lhci/cli lighthouse (to be installed globally)

# before running below command make sure your applications are running(production build).
lhci autorun # 5-run median test with LHCI , this would generate reports under lhci-results directory
node compare-lhci-from-manifest.js #analysis based on the records captured
```

### Note
for remix/react-router , port for production server always changes so,we need to configure its url on `.lighthouserc.json` file.   

## Current Comparision
![alt text](image-3.png)