config.define_string('app_name')
config.define_string('stage')
config.define_string('node_env')
config.define_string('node_version')
config.define_string('infra_tiltfile')
buildStage=config.parse().get('stage', 'dev')
nodeEnv=config.parse().get('node_env', 'development' if buildStage == 'dev' else 'production')
nodeVersion=config.parse().get('node_version', '')
appName=config.parse().get('app_name', '')
infraTiltfile=config.parse().get('infra_tiltfile', '')

# Deploy additional infrastructure
if infraTiltfile != '':
  load_dynamic(infraTiltfile)

# Build app
docker_build(appName, '.',
  target=buildStage,
  build_args={
    'node_env': nodeEnv,
    'node_version': nodeVersion
  },
  live_update=[
    sync('src', '/app/src'),
    sync('package.json', '/app'),
    sync('yarn.lock', '/app'),
    run('cd /app && yarn install --frozen-lockfile', trigger=['./package.json', './yarn.lock']),
  ] if buildStage == 'dev' else []
)

# Deploy app
k8s_yaml(kustomize('manifests/k8s'))
k8s_resource(appName,
  port_forwards=[
    port_forward(3000, name=appName), 
    port_forward(9229, name='Debugger (9229)') if buildStage != 'prod' else 0
  ]
)

