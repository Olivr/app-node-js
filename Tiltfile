config.define_string('stage')
config.define_string('node_env')
buildStage=config.parse().get('stage', 'dev')
nodeEnv=config.parse().get('node_env', 'development' if buildStage == 'dev' else 'production')
appName='my-app' + ('' if buildStage == 'prod' else '-' + buildStage)

k8s_yaml(kustomize('manifests'))

k8s_resource('my-app',
    new_name=appName,
    port_forwards=[
        port_forward(3002, 3000, name=appName), 
        port_forward(9231, 9229, name='debug') if buildStage != 'prod' else ''
    ]
)

docker_build('my-app', '.',
    target=buildStage,
    build_args={'node_env': nodeEnv},
    live_update=[
        sync('src', '/app/src'),
        sync('package.json', '/app'),
        sync('yarn.lock', '/app'),
        run('cd /app && yarn install --frozen-lockfile', trigger=['./package.json', './yarn.lock']),
    ] if buildStage == 'dev' else []
)
