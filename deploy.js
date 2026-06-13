const ghpages = require('gh-pages');

console.log('Starting deployment to GitHub Pages...');

ghpages.publish('out', {
  branch: 'gh-pages',
  repo: 'https://github.com/mohammedmfoad/mo-foad-portfolio.git',
  dotfiles: true
}, function(err) {
  if (err) {
    console.error('Deployment failed:', err);
    process.exit(1);
  } else {
    console.log('Deployment successful!');
  }
});
