<?php
/**
 * Plugin Name:       Questions and Answers
 * Description:       Quizz questions and answers
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Eduardo Sanchez
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       questions-and-answers
 *
 * @package           qa
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function qas_questions_and_answers_blocks_init() {
    
	register_block_type_from_metadata( __DIR__ . '/src/blocks/multiple-choice');
    register_block_type_from_metadata( __DIR__ . '/src/blocks/fill-blanks');    
	register_block_type_from_metadata( __DIR__ . '/src/blocks/true-false', array('render_callback' => 'qa_render_blockmarkup'));    
}
add_action( 'init', 'qas_questions_and_answers_blocks_init' );

function qa_render_blockmarkup( array $attributes ) {
    $id    = $attributes['id'];
    $question = $attributes['question'];

    ob_start();
    ?>

    <div
        class="qa-frontend-question-block"
        data-id="<?php echo esc_attr( $id ); ?>"
        data-post_id="<?php echo esc_attr( get_the_ID() ); ?>"
        data-question="<?php echo esc_attr( $question ); ?>";
    >
    </div>

    <?php
    return ob_get_clean();
}

add_action('rest_api_init', function() {
    register_rest_route( 'questions-and-answers/v1', '/qa-post-blocks/(?P<id>[\d]+)', [
        'methods'             => ['POST', 'GET'],
        'callback'            => 'update_qas'
    ] );
});

/*function check_initiative_permissions( WP_REST_Request $request ) : bool {
    $post_id = $request->get_param( 'id' ) ?? 0;

    if ( ! is_user_logged_in() ) {
        return false;
    }

    $post = get_post( $post_id );

    if ( null === $post ) {
        return false;
    }

    if ( current_user_can( 'edit_published_posts' ) ) {
        return true;
    }

    return get_current_user_id() === $post->post_author;
}*/

function update_qas( WP_REST_Request $request ) : WP_REST_Response {
    $post_id      = $request->get_param( 'id' );
    $post_content = get_post_field( 'post_content', $post_id );
    $post_blocks  = parse_blocks( $post_content );
    $blocks_by_id = array();
    $block_names = ['qa/true-false', 'qa/fill-blanks', 'qa/multiple-choice'];

    foreach($post_blocks as $block) {
        if( in_array( $block['blockName'], $block_names) && $post_content ) {
            $blocks_by_id[$block['attrs']['id']] = array(
                $block
            );
        }
    }
    
    $blocks = json_encode( $blocks_by_id );

    return new WP_REST_Response($blocks, 200 );
}

function qas_enqueue_files() {  
    $asset_file = require plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

    // Register frontend script.
	if ( ! is_admin() ) {
		wp_enqueue_script(
			'qa-frontend-script',
			plugins_url( '/build/frontend.js', __FILE__ ),
			array_merge( $asset_file['dependencies'], [
				'wp-api-fetch',
			] ),
			$asset_file['version'],
			true
		);
	}

    wp_add_inline_script( 'qa-frontend-script', 'const qasAPIRoute="questions-and-answers/v1/qa-post-blocks"', 'before' );
}
add_action( 'wp_enqueue_scripts', 'qas_enqueue_files' );



function qas_enqueue_blocks_scripts() {
    $asset_file = require plugin_dir_path( __FILE__ ) . 'build/index.asset.php';
    var_dump($asset_file);
    wp_enqueue_script( 'qas-main', plugins_url( '/build/index.js', __FILE__ ), $asset_file['dependencies'], 1.0, false);
}
add_action( 'enqueue_block_editor_assets', 'qas_enqueue_blocks_scripts');
